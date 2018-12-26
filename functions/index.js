const functions = require('firebase-functions');
const admin = require('firebase-admin')

admin.initializeApp()
admin.firestore().settings({
  timestampsInSnapshots: true
})
const db = admin.firestore()

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
