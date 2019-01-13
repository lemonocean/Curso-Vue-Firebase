const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()
admin.firestore().settings({
  timestampsInSnapshots: true
})
const db = admin.firestore()
const auth = admin.auth()
const storage = admin.storage()

const tmpdir = require('os').tmpdir
const join = require('path').join
const fs = require('fs-extra')
const sharp = require('sharp')
const dimensiones = [512, 256, 128, 64, 32]

exports.generarMiniaturas = functions.https.onCall(async (data, context) => {
  let token = await auth.verifyIdToken(data.idToken)

  if (!token) {
    console.log('Llamado sin autorización.')
    return false
  }

  let uid = token.uid
  let fotoId = data.fotoId

  const bucket = storage.bucket()

  let imagenOriginal = `usuarios/${uid}/fotos-perfil/${fotoId}.jpg`
  let directorioFisico = join(tmpdir(), 'temporal')
  let rutaFisica = join(directorioFisico, fotoId + '.jpg')

  try {
    await fs.ensureDir(directorioFisico)

    await bucket.file(imagenOriginal).download({
      destination: rutaFisica
    })

    let promises = dimensiones.map(async dimension => {
      let ancho = dimension
      let alto = dimension

      const imagenMiniatura = `${fotoId}-${ancho}x${alto}.jpg`
      const rutaFisicaMiniatura = join(directorioFisico, imagenMiniatura)

      await sharp(rutaFisica)
        .resize(ancho, alto)
        .toFile(rutaFisicaMiniatura)

      const destino = `usuarios/${uid}/fotos-perfil/${imagenMiniatura}`

      await bucket.upload(rutaFisicaMiniatura, {
        destination: destino,
        uploadType: 'media',
        metadata: {
          contentType: 'image/jpg'
        }
      })

      await fs.remove(rutaFisicaMiniatura)
    })

    await Promise.all(promises)

    await fs.remove(rutaFisica)

    await bucket.file(imagenOriginal).delete()

    return true
  } catch (error) {
    console.log(error)
    return false
  }
})

exports.actualizarNombresApellidos = functions.firestore
  .document('usuarios/{uid}')
  .onUpdate(async (change, contex) => {
    const actual = change.after.data()
    const anterior = change.before.data()

    if (actual.nombres !== anterior.nombres || actual.apellidos !== anterior.apellidos) {
      let batch = db.batch()

      try {
        let resultado = await db.collection('usuarios')
                                .doc(contex.params.uid)
                                .collection('reservas')
                                .get()

        resultado.forEach(doc => {

          let reserva = doc.data()

          batch.update(
            db.collection('obras')
              .doc(reserva.presentacion.obra.oid)
              .collection('presentaciones')
              .doc(reserva.presentacion.pid)
              .collection('reservas')
              .doc(reserva.rid),
              { 'usuario.nombres': actual.nombres, 'usuario.apellidos': actual.apellidos }
          )
        })

        return batch.commit()
      }
      catch (error) {
        console.log(error)
      }
    }

    return null
  })
