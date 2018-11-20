<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-slide-y-transition mode="out-in" @enter="enter">
        <v-card v-if="vista == 1" :key="1" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>
              Regístrate
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="subheading text-xs-center">
            Regístrate con tu red social preferida
          </v-card-text>
          <v-card-text>
            <v-layout justify-center>
              <a @click="siguiente(1, 'facebook')">
                <v-avatar tile>
                  <img  alt="Ingreso Facebook" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M483.7 0H28.3C12.7 0 0 12.7 0 28.3v455.5C0 499.3 12.7 512 28.3 512h245.2V314H207v-77.5h66.5v-57c0-66.1 40.4-102.1 99.4-102.1 28.3 0 52.5 2.1 59.6 3v69.1h-40.7c-32.1 0-38.3 15.3-38.3 37.6v49.4h76.7l-10 77.5h-66.7v198h130.2c15.6 0 28.3-12.7 28.3-28.3V28.3C512 12.7 499.3 0 483.7 0z' fill='%234267b2'/><path d='M353.5 512V314h66.8l10-77.5h-76.8v-49.4c0-22.4 6.2-37.6 38.3-37.6h40.7V80.4c-7.1-.9-31.4-3-59.6-3-59 0-99.4 36-99.4 102.1v57H207V314h66.5v198h80z' fill='%23fff'/></svg>">
                </v-avatar>
              </a>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="subheading text-xs-center">
            Regístrate con una cuenta de email y constraseña
          </v-card-text>
          <v-card-text>
            <v-text-field @blur="$v.f1.email.$touch()" autofocus :error-messages="erroresEmail" v-model="f1.email" label="Email"></v-text-field>
            <v-text-field @blur="$v.f1.password.$touch()" :error-messages="erroresPassword" v-model="f1.password" label="Password" type="password"></v-text-field>
            <v-text-field @keyup.enter="siguiente(1, 'email')" @blur="$v.f1.repetirPassword.$touch()" :error-messages="erroresRepetirPassword" v-model="f1.repetirPassword" label="Repetir Password" type="password"></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout justify-end>
              <v-btn :depressed="$v.f1.$invalid" :disabled="$v.f1.$invalid" @click="siguiente(1, 'email')" color="secondary">Siguiente</v-btn>
            </v-layout>
          </v-card-text>
          <v-card-actions>
            <v-btn :to="{ name: 'login' }" flat color="secondary">
              ¿Ya tienes cuenta? Ingresa.
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-card v-if="vista == 2" :key="2" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>
              Ingresa tus Nombres y Apellidos
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field @blur="$v.f2.nombres.$touch()" autofocus :error-messages="erroresNombres" v-model="f2.nombres" label="Nombres"></v-text-field>
            <v-text-field @keyup.enter="siguiente(2)" @blur="$v.f2.apellidos.$touch()" :error-messages="erroresApellidos" v-model="f2.apellidos" label="Apellidos"></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="vista--">Atrás</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn @click="siguiente(2)" :depressed="$v.f2.$invalid" :disabled="$v.f2.$invalid" color="secondary">Siguiente</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card v-if="vista == 3" :key="3" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>
              Selecciona tu Fecha de Nacimiento
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-layout justify-center>
              <v-date-picker ref="calendario" :max="fechaMaxima" v-model="fechaNacimiento" reactive locale="es-co" class="elevation-3"></v-date-picker>
            </v-layout>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="vista--">Atrás</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn @click="registrar" :depressed="$v.fechaNacimiento.$invalid" :disabled="$v.fechaNacimiento.$invalid" color="secondary">Registrarse</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'
import { nombreCompuesto } from '@/utilidades/validaciones'
import { mapMutations, mapGetters } from 'vuex'
import { firebase, auth } from '@/firebase'

export default {
  data() {
    return {
      metodo: 'email',
      vista: 1,
      f1: {
        email: '',
        password: '',
        repetirPassword: ''
      },
      f2: {
        nombres: '',
        apellidos: ''
      },
      fechaNacimiento: null,
      fechaMaxima: null
    }
  },
  validations: {
    f1: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      },
      repetirPassword: {
        sameAs: sameAs('password')
      }
    },
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
    fechaNacimiento: {
      required
    }
  },
  created() {
    let fechaActual = new Date()
    this.fechaMaxima = new Date(fechaActual.setFullYear(fechaActual.getFullYear() - 13))
      .toISOString()
      .substr(0, 10)
  },
  methods: {
    ...mapMutations(['mostrarOcupado', 'ocultarOcupado', 'mostrarExito', 'mostrarError', 'mostrarAdvertencia']),
    ...mapMutations('sesion', ['actualizarUsuario']),
    siguiente(vista, metodo) {
      switch (vista) {
        case 1:
          if (this.$v.f1.$invalid && metodo == 'email') {
            this.$v.f1.$touch()
            return
          }
          else {
            this.metodo = metodo
            this.vista++
          }
          break
        case 2:
          if (this.$v.f2.$invalid) {
            this.$v.f2.$touch()
            return
          }
          else {
            this.vista++
          }
          break
      }
    },
    async registrar() {
      if (this.$v.fechaNacimiento.$invalid) { return }

      switch(this.metodo) {
        case 'email':
          this.registrarEmail()
          break

        case 'facebook':
          this.registrarFacebook()
          break
      }
    },
    async registrarEmail() {
      try {
        this.mostrarOcupado({ titulo: 'Creando Registro', mensaje: 'Estamos registrando tu información...' })

        await auth.createUserWithEmailAndPassword(this.f1.email, this.f1.password)        
        await auth.currentUser.sendEmailVerification()

        this.mostrarExito(this.saludo)
        this.$router.push( { name: 'envio-verificacion-email' } )
      }
      catch (error) {        

        switch(error.code) {
          case 'auth/email-already-in-use':
            this.mostrarAdvertencia('Ya se ha registrado esta dirección de email con anterioridad')
            break

          default:
            this.mostrarError('Ocurrió un error registrando tu cuenta. Inténtalo más tarde.')
            break
        }
      }
      finally {
        this.ocultarOcupado()
      }
    },
    async registrarFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider()

      provider.setCustomParameters({
        'display': 'popup'
      })

      auth.languageCode = 'es_CO'

      try {
        await auth.signInWithPopup(provider)

        this.mostrarExito(this.saludo)
        this.$router.push({ name: 'home' })
      }
      catch(error) {
        this.mostrarError('Ocurrió un error registrando tu cuenta.')
      }
    },
    enter() {
      if (this.vista == 3 && !this.fechaNacimiento) {
        this.$refs.calendario.activePicker = 'YEAR'
      }
    }
  },
  computed: {
    ...mapGetters('sesion', ['saludo']),
    erroresEmail() {
      let errores = []
      if (!this.$v.f1.email.$dirty) { return errores }
      if (!this.$v.f1.email.required) { errores.push('Ingresa tu email.') }
      if (!this.$v.f1.email.email) { errores.push('Ingresa un email válido.') }
      return errores
    },
    erroresPassword() {
      let errores = []
      if (!this.$v.f1.password.$dirty) { return errores }
      if (!this.$v.f1.password.required) { errores.push('Ingresa tu password.') }
      if (!this.$v.f1.password.minLength) { errores.push('Ingresa al menos 6 caracteres.') }
      if (!this.$v.f1.password.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
      return errores
    },
    erroresRepetirPassword() {
      let errores = []
      if (!this.$v.f1.repetirPassword.$dirty) { return errores }
      if (!this.$v.f1.repetirPassword.sameAs) { errores.push('Las contraseñas no coinciden.') }
      return errores
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
    }
  }
}
</script>
