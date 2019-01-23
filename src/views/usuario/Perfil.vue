<template>
  <v-layout text-xs-center align-start justify-center class="mt-5">
    <v-card v-if="usuario" class="elevation-6" max-width="250">
      <v-btn v-if="perfilPropio" @click="editando = !editando" color="secondary" class="elevation-1" fab small absolute top right>
        <v-fade-transition mode="out-in">
          <v-icon v-if="!editando" :key="1">edit</v-icon>
          <v-icon v-else :key="2">close</v-icon>
        </v-fade-transition>
      </v-btn>
      <v-card-text>
        <v-layout justify-center>
          <v-btn @click="editarNombresApellidos" v-if="editando" color="secondary" flat icon small>
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="ma-2">
            {{ usuario.nombres + ' ' + usuario.apellidos }}
          </div>
        </v-layout>
        <v-img v-if="fotoPerfil" class="ma-2 fotoPerfil" :src="fotoPerfil">
          <v-layout fill-height align-end justify-end>
            <v-btn v-if="editando" :to="{ name: 'edicion-foto-perfil' }" color="white" outline icon large>
              <v-icon>edit</v-icon>
            </v-btn>
          </v-layout>
        </v-img>
        <v-layout justify-center>
          <v-btn @click="editarDescripcion" v-if="editando" color="secondary" flat icon small>
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="ma-2 descripcion">
            <span v-if="usuario.descripcion">{{ usuario.descripcion }}</span>
            <span v-else>Agrega una descripción</span>
          </div>
        </v-layout>
        <v-layout justify-center>
          <v-btn @click="editarBiografia" v-if="editando" color="secondary" flat icon small>
            <v-icon>edit</v-icon>
          </v-btn>
          <div class="ma-2">
            <a v-if="usuario.biografia" :href="usuario.biografia" target="_blank" class="ma-2 link">Biografia</a>
            <span v-else>Ingresa tu biografía</span>
          </div>
        </v-layout>
      </v-card-text>
    </v-card>

    <!-- Nombres y Apellidos -->
    <v-dialog v-model="editandoNombresApellidos" max-width="400">
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            Ingresa tus Nombres y Apellidos
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field @blur="$v.f2.nombres.$touch()" autofocus :error-messages="erroresNombres" v-model="f2.nombres" label="Nombres"></v-text-field>
          <v-text-field @blur="$v.f2.apellidos.$touch()" :error-messages="erroresApellidos" v-model="f2.apellidos" label="Apellidos"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-layout justify-start>
                <v-btn @click="editandoNombresApellidos = false">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn @click="guardarNombresApellidos" :depressed="$v.f2.$invalid" :disabled="$v.f2.$invalid" color="secondary">Guardar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Descripción -->
    <v-dialog v-model="editandoDescripcion" max-width="400">
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            Ingresa una Descripción
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-textarea label="Agrega un descripción." v-model="edicionDescripcion" counter="300" autofocus :error-messages="erroresDescripcion"></v-textarea>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-layout justify-start>
                <v-btn @click="editandoDescripcion = false">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn @click="guardarDescripcion" :depressed="$v.edicionDescripcion.$invalid" :disabled="$v.edicionDescripcion.$invalid" color="secondary">Guardar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Biografía -->
    <v-dialog v-model="editandoBiografia" max-width="400">
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            Ingresa tu Biografía
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field @blur="$v.edicionBiografia.$touch()" autofocus :error-messages="erroresBiografia" v-model="edicionBiografia" label="Biografía"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout>
            <v-flex xs6>
              <v-layout justify-start>
                <v-btn @click="editandoBiografia = false">Cancelar</v-btn>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-layout justify-end>
                <v-btn @click="guardarBiografia" :depressed="$v.edicionBiografia.$invalid" :disabled="$v.edicionBiografia.$invalid" color="secondary">Guardar</v-btn>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { required, minLength, maxLength, url } from 'vuelidate/lib/validators'
import { nombreCompuesto } from '@/utilidades/validaciones'
import { mapMutations } from 'vuex'
import { auth, db, storage } from '@/firebase'

export default {
  data() {
    return {
      usuario: null,
      editando: false,
      editandoNombresApellidos: false,
      f2: {
        nombres: '',
        apellidos: ''
      },
      editandoDescripcion: false,
      edicionDescripcion: '',
      editandoBiografia: false,
      edicionBiografia: '',
      fotoPerfil: null
    }
  },
  validations: {
    f2: {
      nombres: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto
      },
      apellidos: {
        required,
        minLength: minLength(3),
        maxLength: maxLength(20),
        nombreCompuesto
      }
    },
    edicionDescripcion: {
      maxLength: maxLength(300)
    },
    edicionBiografia: {
      url
    }
  },
  created() {
    this.consultarUsuario()
  },
  watch: {
    '$route' () {
      this.consultarUsuario()
    }
  },
  methods: {
    ...mapMutations(['mostrarExito', 'mostrarError', 'mostrarOcupado', 'ocultarOcupado']),
    ...mapMutations('sesion', ['actualizarNombresApellidos', 'actualizarDescripcion', 'actualizarBiografia']),
    async consultarUsuario() {
      let userNameParametro = this.$route.params.userName.toLowerCase()

      this.mostrarOcupado({ titulo: 'Consultando Información', mensaje: 'Cargando datos...' })

      try {
        let userNameDoc = await db.collection('userNames')
                                  .doc(userNameParametro)
                                  .get()

        if(userNameDoc.exists) {
          let userName = userNameDoc.data()

          let usuarioDoc = await db.collection('usuarios')
                                   .doc(userName.uid)
                                   .get()

          if(usuarioDoc.exists) {
            this.usuario = usuarioDoc.data()

            if (this.usuario.fotoPerfil) {
              let uid = this.usuario.uid
              let fotoPerfil = this.usuario.fotoPerfil

              storage.ref()
                     .child(`usuarios/${uid}/fotos-perfil/${fotoPerfil}-256x256.jpg`)
                     .getDownloadURL()
                     .then(url => {
                       this.fotoPerfil = url
                     })
            }
            else {
              this.fotoPerfil = require('@/assets/fotoUsuario.png')
            }
          }
          else {
            this.$router.push({ name: '404' })
          }
        }
        else {
          this.$router.push({ name: '404' })
        }
      }
      catch (error) {
        console.log(error)
        this.$router.push({ name: '404' })
      }
      finally {
        this.ocultarOcupado()
      }
    },
    editarNombresApellidos() {
      this.f2.nombres = this.usuario.nombres
      this.f2.apellidos = this.usuario.apellidos
      this.editandoNombresApellidos = true
    },
    async guardarNombresApellidos() {
      if (this.f2.nombres == this.usuario.nombres && this.f2.apellidos == this.usuario.apellidos) {
        this.editandoNombresApellidos = false
        return
      }

      this.mostrarOcupado({ titulo: 'Actualizando Información', mensaje: 'Estamos guardando tus nombres y apellidos...' })

      try {
        await db.collection('usuarios')
          .doc(this.usuario.uid)
          .update({ nombres: this.f2.nombres, apellidos: this.f2.apellidos })

        this.actualizarNombresApellidos({ nombres: this.f2.nombres, apellidos: this.f2.apellidos })

        this.usuario.nombres = this.f2.nombres
        this.usuario.apellidos = this.f2.apellidos

        this.editandoNombresApellidos = false
        this.editando = false
      }
      catch (error) {
        this.mostrarError('Ocurrió un error actualizando tus datos.')
      }
      finally {
        this.ocultarOcupado()
      }
    },
    editarDescripcion() {
      this.edicionDescripcion = this.usuario.descripcion || ''
      this.editandoDescripcion = true
    },
    async guardarDescripcion() {
      if(this.edicionDescripcion == this.usuario.descripcion) {
        this.editandoDescripcion = false
        return
      }

      this.mostrarOcupado({ titulo: 'Actualizando Información', mensaje: 'Estamos guardando la descripción...' })

      try {
        await db.collection('usuarios')
                .doc(this.usuario.uid)
                .update({ descripcion: this.edicionDescripcion })

        this.actualizarDescripcion(this.edicionDescripcion)

        this.usuario.descripcion = this.edicionDescripcion

        this.editandoDescripcion = false
        this.editando = false
      }
      catch (error) {
        this.mostrarError('Ocurrió un error actualizando tus datos.')
      }
      finally {
        this.ocultarOcupado()
      }
    },
    editarBiografia() {
      this.edicionBiografia = this.usuario.biografia || ''
      this.editandoBiografia = true
    },
    async guardarBiografia() {
      if(this.edicionBiografia == this.usuario.biografia) {
        this.editandoBiografia = false
        return
      }

      this.mostrarOcupado({ titulo: 'Actualizando Información', mensaje: 'Estamos actualizando la biografía...' })

      try {
        await db.collection('usuarios')
                .doc(this.usuario.uid)
                .update({ biografia: this.edicionBiografia })

        this.actualizarBiografia(this.edicionBiografia)

        this.usuario.biografia = this.edicionBiografia

        this.editandoBiografia = false
        this.editando = false

        this.mostrarExito('Se actualizó la biografía correctamente.')
      }
      catch (error) {
        this.mostrarError('Ocurrió un error actualizando tus datos.')
      }
      finally {
        this.ocultarOcupado()
      }
    }
  },
  computed: {
    perfilPropio() {
      return this.usuario && this.usuario.uid == auth.currentUser.uid
    },
    erroresNombres() {
      let errores = []
      if (!this.$v.f2.nombres.$dirty) { return errores }
      if (!this.$v.f2.nombres.required) { errores.push('Ingresa tu nombre.') }
      if (!this.$v.f2.nombres.minLength) { errores.push('Ingresa al menos 3 caracteres.') }
      if (!this.$v.f2.nombres.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
      if (!this.$v.f2.nombres.nombreCompuesto) { errores.push('Ingresa un nombre válido.') }
      return errores
    },
    erroresApellidos() {
      let errores = []
      if (!this.$v.f2.apellidos.$dirty) { return errores }
      if (!this.$v.f2.apellidos.required) { errores.push('Ingresa tus apellidos.') }
      if (!this.$v.f2.apellidos.minLength) { errores.push('Ingresa al menos 3 caracteres.') }
      if (!this.$v.f2.apellidos.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
      if (!this.$v.f2.apellidos.nombreCompuesto) { errores.push('Ingresa un apellido válido.') }
      return errores
    },
    erroresDescripcion() {
      let errores = []
      if (!this.$v.edicionDescripcion.$dirty) { return errores }
      if (!this.$v.edicionDescripcion.maxLength) { errores.push('Ingresa máximo 300 caracteres.') }
      return errores
    },
    erroresBiografia() {
      let errores = []
      if (!this.$v.edicionBiografia.$dirty) { return errores }
      if (!this.$v.edicionBiografia.url) { errores.push('Ingresa una url válida.') }
      return errores
    }
  }
}
</script>


<style>
.fotoPerfil {
  width: 200px;
  height: 100%;
}

.descripcion {
  text-align: justify;
}

.link {
  text-decoration: none;
  font-size: 1rem;
  color: #553f75;
}
</style>
