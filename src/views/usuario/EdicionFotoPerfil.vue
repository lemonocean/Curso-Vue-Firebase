<template>
  <v-layout wrap justify-center align-start>
    <v-flex xs12>
      <v-layout justify-center>
        <v-card max-width="250">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>
             <span v-if="vista == 1">Foto de Perfil Actual</span>
             <span v-if="vista == 2">Vista Previa</span>
            </v-toolbar-title>        
          </v-toolbar>
          <v-card-text>
            <v-img v-if="vista == 1" :src="fotoPerfil" alt="Foto de Perfil"></v-img>
            <div v-if="vista == 2" ref="vistaPrevia" class="vistaPrevia"></div>
          </v-card-text>
          <v-card-text>
            <v-layout v-if="vista == 1" justify-center>
              <v-btn color="secondary" :to="{ name: 'perfil', params: { userName: usuario.userName } }">Regresar</v-btn>
            </v-layout>
            <v-layout v-if="vista == 2" justify-center>
              <v-flex xs6>
                <v-btn :to="{ name: 'perfil', params: { userName: usuario.userName } }">Cancelar</v-btn>
              </v-flex>
              <v-flex xs6>
                <v-btn @click="guardarImagen" color="secondary">Guardar</v-btn>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm10 md8 lg6 xl4 mt-3>
      <v-card>
        <v-tabs color="primary" dark icons-and-text>
          <v-tab>
            Subir Imagen
            <v-icon>cloud_upload</v-icon>
          </v-tab>
          <v-tab-item>
            <file-pond v-if="vista == 1" @addfile="cargarImagen" instant-upload="false" fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}" labelFileTypeNotAllowed="Agrega una imagen .png o .jpg" accepted-file-types="image/jpeg, image/png" label-idle="Selecciona o arrastra una imagen..."></file-pond>
            <v-responsive v-if="vista == 2">
              <img ref="imagenOriginal" src="" alt="" class="edicionImagen">
            </v-responsive>
          </v-tab-item>
          <v-tab v-if="fotosPerfil.length > 1">
            Galería
            <v-icon>photo_library</v-icon>
          </v-tab>
          <v-tab-item v-if="fotosPerfil.length > 1">
            <v-layout wrap justify-start>
              <v-flex xs6 sm4 lg3 v-for="foto in fotosPerfil" :key="foto.id">
                <v-card class="ma-3">
                  <v-card-text>
                    <v-img :src="foto.url" alt="Foto Perfil"></v-img>
                    <v-layout class="mt-3">
                      <v-flex xs6>
                        <v-layout justify-start>
                          <v-icon v-if="foto.url == usuario.fotoPerfil" color="green" medium>check_circle</v-icon>
                          <v-icon v-else color="grey" @click="seleccionarFotoPerfil(foto.url)" medium>check_circle_outline</v-icon>
                        </v-layout>
                      </v-flex>
                      <v-flex xs6>
                        <v-layout justify-end>
                          <v-icon v-if="foto.url != usuario.fotoPerfil" medium>delete</v-icon>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import { db, storage } from '@/firebase'
import { mapState, mapGetters, mapMutations } from 'vuex'

import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import "filepond/dist/filepond.min.css"

import Cropper from 'cropperjs/dist/cropper'
import 'cropperjs/dist/cropper.css'

import uuidv4 from 'uuid/v4'

const FilePond = vueFilePond(FilePondPluginFileValidateType)

export default {
  components: { FilePond },
  data() {
    return {
      vista: 1,
      cropper: null,
      fotosPerfil: []
    }
  },
  computed: {
    ...mapState('sesion', ['usuario']),
    ...mapGetters('sesion', ['fotoPerfil'])
  },
  created() {
    this.consultarFotosPerfil()
  },
  methods: {
    ...mapMutations(['mostrarError', 'mostrarOcupado', 'ocultarOcupado']),
    ...mapMutations('sesion', ['actualizarFotoPerfil']),
    async consultarFotosPerfil() {

      this.mostrarOcupado({ titulo: 'Consultando Galería', mensaje: 'Recuperando galería de imágenes...' })

      try {
        let resultado = await db.collection('usuarios')
                                .doc(this.usuario.uid)
                                .collection('fotos-perfil')
                                .orderBy('fecha', 'desc')
                                .get()

        resultado.docs.forEach(doc => {
          this.fotosPerfil.push(doc.data())
        })
      }
      catch (error) {
        this.mostrarError('Ocurrió un error recuperando tu galería de fotos.')
      }
      finally {
        this.ocultarOcupado()
      }
    },
    cargarImagen (error, archivo) {
      if (error) {
        this.mostrarError('Ocurrió un error leyendo la imagen.')
        return
      }

      this.vista = 2

      let reader = new FileReader()

      let vm = this

      reader.onloadend = () => {
        vm.$refs.imagenOriginal.src = reader.result
        vm.recortarImagen()
      }

      if (archivo) {
        if (archivo.file) {
          reader.readAsDataURL(archivo.file)
        }
      }
    },
    recortarImagen() {
      this.cropper = new Cropper(this.$refs.imagenOriginal, {
        preview: this.$refs.vistaPrevia,
        aspectRatio: 1,
        modal: false,
        guides: true,
        sized: false,
        zoomable: false,
        highlight: true,
        background: false,
        autoCrop: true
      })
    },
    async guardarImagen() {
      this.mostrarOcupado({ titulo: 'Almacenando Imagen', mensaje: 'Actualizando imagen de perfil...' })
    
      let canvas = this.cropper.getCroppedCanvas()
      let imagen = canvas.toDataURL('image/jpeg')
      let fotoId = uuidv4()

      try {
        let ref = storage.ref()

        let resultado = await ref.child(`usuarios/${this.usuario.uid}/fotos-perfil/${fotoId}.jpg`)
                                 .putString(imagen, 'data_url')

        let url = await resultado.ref.getDownloadURL()

        let fotoPerfil = {
          fotoId,
          fecha: new Date(),
          url,
          uid: this.usuario.uid
        }

        await db.collection('usuarios')
                .doc(this.usuario.uid)
                .collection('fotos-perfil')
                .doc(fotoId)
                .set(fotoPerfil)

        await db.collection('usuarios')
                .doc(this.usuario.uid)
                .update({ fotoPerfil: url })

        this.actualizarFotoPerfil(url)

        this.$router.push({ name: 'perfil', params: { userName: this.usuario.userName } })
      }
      catch (error) {
        this.mostrarError('Ocurrió un error almacenando la imagen.')
      }
      finally {
        this.ocultarOcupado()
      }
    },
    async seleccionarFotoPerfil(url) {
      this.mostrarOcupado({ titulo: 'Actualizando Imagen', mensaje: 'Estableciendo foto de perfil...' })
    
      try {
        await db.collection('usuarios')
                .doc(this.usuario.uid)
                .update({ fotoPerfil: url })

        this.actualizarFotoPerfil(url)
      }
      catch (error) {
        this.mostrarError('Ocurrió un error seleccionando la imagen.')
      }
      finally {
        this.ocultarOcupado()
      }
    }
  }
}
</script>

<style>
.filepond--drop-label {
  font-size: 14pt !important;
}

.edicionImagen {
  width: 100%;
}

.vistaPrevia {
  width: 200px;
  height: 200px;
  overflow: hidden;
}
</style>

