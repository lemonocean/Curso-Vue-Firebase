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
        </v-card>
      </v-layout>
    </v-flex>
    <v-flex xs12 sm10 md8 lg6 xl4>
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            Cargar Imagen
          </v-toolbar-title>        
        </v-toolbar>
        <v-card-text>
          <file-pond v-if="vista == 1" @addfile="cargarImagen" instant-upload="false" fileValidateTypeLabelExpectedTypes="Se esperaba {allButLastType} o {lastType}" labelFileTypeNotAllowed="Agrega una imagen .png o .jpg" accepted-file-types="image/jpeg, image/png" label-idle="Selecciona o arrastra una imagen..."></file-pond>
          <img v-if="vista == 2" ref="imagenOriginal" src="" alt="" class="edicionImagen">
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import { mapState, mapGetters, mapMutations } from 'vuex'

import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import "filepond/dist/filepond.min.css"

import Cropper from 'cropperjs/dist/cropper'
import 'cropperjs/dist/cropper.css'

const FilePond = vueFilePond(FilePondPluginFileValidateType)

export default {
  components: { FilePond },
  data() {
    return {
      vista: 1,
      cropper: null
    }
  },
  computed: {
    ...mapState('sesion', ['usuario']),
    ...mapGetters('sesion', ['fotoPerfil'])
  },
  methods: {
    ...mapMutations(['mostrarError']),
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

