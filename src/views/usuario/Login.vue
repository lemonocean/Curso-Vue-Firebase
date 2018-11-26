<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card class="elevation-6">
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            Ingresa tus Credenciales
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading text-xs-center">
            Ingresa con tu red social preferida
          </v-card-text>
          <v-card-text>
            <v-layout justify-center>
              <a @click="ingresar('facebook')" class="mx-3">
                <v-avatar tile :size="40">
                  <img  alt="Ingreso Facebook" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M483.7 0H28.3C12.7 0 0 12.7 0 28.3v455.5C0 499.3 12.7 512 28.3 512h245.2V314H207v-77.5h66.5v-57c0-66.1 40.4-102.1 99.4-102.1 28.3 0 52.5 2.1 59.6 3v69.1h-40.7c-32.1 0-38.3 15.3-38.3 37.6v49.4h76.7l-10 77.5h-66.7v198h130.2c15.6 0 28.3-12.7 28.3-28.3V28.3C512 12.7 499.3 0 483.7 0z' fill='%234267b2'/><path d='M353.5 512V314h66.8l10-77.5h-76.8v-49.4c0-22.4 6.2-37.6 38.3-37.6h40.7V80.4c-7.1-.9-31.4-3-59.6-3-59 0-99.4 36-99.4 102.1v57H207V314h66.5v198h80z' fill='%23fff'/></svg>">
                </v-avatar>
              </a>
              <a @click="ingresar('google')" class="mx-3">
                <v-avatar tile :size="40">
                  <img  alt="Ingreso Google" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='%23ea4335' d='M261.1 0C161 0 74.5 57.4 32.3 141l85.5 66.3c20.1-60.5 76.6-105.5 143.2-105.5 37.6 0 71.3 12.9 97.9 38.3l73.4-73.4C388.1 25.4 330.1 0 261.1 0z'/><path fill='%23fbbc05' d='M117.9 207.4L32.3 141C15 175.6 5.1 214.7 5.1 256s9.9 80.4 27.2 115l85.5-66.3c-5.1-15.4-8-31.8-8-48.6 0-17 3-33.4 8.1-48.7z'/><path fill='%2334a853' d='M347.8 385.7c-22.9 15.4-52.2 24.4-86.7 24.4-66.7 0-123.1-45-143.2-105.5L32.3 371C74.5 454.6 161 512 261.1 512c69.1 0 127.1-22.9 169.4-62l-82.7-64.3z'/><path fill='%234285f4' d='M502.2 209.5H261.1v99h137.8c-5.9 32-24 59.1-51.1 77.3l82.7 64.2c48.4-44.6 76.3-110.2 76.3-188.2.1-18.1-1.5-35.6-4.6-52.3z'/></svg>">
                </v-avatar>
              </a>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="subheading text-xs-center">
            Ingresa con una cuenta de email y constraseña
          </v-card-text>
        <v-card-text>
          <v-text-field label="Email" autofocus v-model="formulario.email" :error-messages="erroresEmail" @blur="$v.formulario.email.$touch()"></v-text-field>
          <v-text-field label="Password" @keyup.enter="ingresar('email')" v-model="formulario.password" :error-messages="erroresPassword" @blur="$v.formulario.password.$touch()" type="password"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn @click="ingresar('email')" :depressed="$v.formulario.$invalid" :disabled="$v.formulario.$invalid" color="secondary">Ingresar</v-btn>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="solicitudPassword = true" flat color="secondary">
            ¿Olvidaste tu contraseña?
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn :to="{ name: 'registro' }" flat color="secondary">
            ¿No tienes cuenta? Regístrate.
          </v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="solicitudPassword" max-width="400" persistent>
        <v-card>
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>
              Restablecer Contraseña
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="subheading">
            Ingresa la dirección de email con la cual te registraste.
          </v-card-text>
          <v-card-text>
            <v-text-field label="Email" autofocus v-model="emailEnvio" :error-messages="erroresEmailEnvio" @blur="$v.emailEnvio.$touch()"></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout>
              <v-flex xs6>
                <v-layout justify-start>
                  <v-btn @click="solicitudPassword = false">Cancelar</v-btn>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout justify-end>
                  <v-btn color="secondary" @click="enviarSolicitudPassword" :depressed="$v.emailEnvio.$invalid" :disabled="$v.emailEnvio.$invalid">Enviar</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>

import { required, email, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapMutations, mapGetters } from 'vuex'
import { firebase, auth } from '@/firebase'

export default {
  data() {
    return {
      formulario: {
        email: '',
        password: ''
      },
      solicitudPassword: false,
      emailEnvio: ''
    }
  },
  validations: {
    formulario: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      }
    },
    emailEnvio: {
      required,
      email
    }
  },
  methods: {
    ...mapMutations(['mostrarOcupado', 'ocultarOcupado', 'mostrarExito', 'mostrarAdvertencia']),
    ...mapMutations('sesion', ['actualizarUsuario']),
    ingresar(metodo) {
      switch(metodo) {
        case 'email':
          this.ingresarEmail()
          break

        case 'facebook':
          this.ingresarFacebook()
          break

        case 'google':
          this.ingresarGoogle()
          break
      }
    },
    async ingresarEmail() {
      if (this.$v.formulario.$invalid) {
        this.$v.formulario.$touch()
        return
      }

      let ocupado = {
        titulo: 'Validando Credenciales',
        mensaje: 'Estamos validando tu información...'
      }

      this.mostrarOcupado(ocupado)

      try {
        await auth.signInWithEmailAndPassword(this.formulario.email, this.formulario.password)
      }
      catch (error) {

        switch (error.code) {
          case 'auth/user-not-found':
          case 'auth/wrong-password':
            this.mostrarAdvertencia('Usuario no válido. Revisa tu correo y contraseña.')
            break

          default:
            this.mostrarError('Ocurrió un error validando la información.')
            break
        }
      }
      finally {
        this.ocultarOcupado()
      }
    },
    async ingresarFacebook() {
      let provider = new firebase.auth.FacebookAuthProvider()

      provider.setCustomParameters({
        'display': 'popup'
      })

      auth.languageCode = 'es_CO'

      try {
        await auth.signInWithPopup(provider)
      }
      catch(error) {
        this.mostrarError('Ocurrió un error validando tu información.')
      }
    },
    async ingresarGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider()

      provider.setCustomParameters({
        'display': 'popup'
      })

      auth.languageCode = 'es_CO'

      try {
        await auth.signInWithPopup(provider)
      }
      catch(error) {
        this.mostrarError('Ocurrió un error validando tu información.')
      }
    },
    async enviarSolicitudPassword() {
      this.solicitudPassword = false
      this.mostrarOcupado({ titulo: 'Enviando Solicitud', mensaje: 'Enviando solicitud de restablecimiento de constraseña...' })

      try {
        await auth.sendPasswordResetEmail(this.emailEnvio)
        this.mostrarExito('Se ha enviado la solicitu de restablecimiento de contraseña.')
      }
      catch (error) {
        this.mostrarError('Ocurrió un error enviando la solicitud.')
      }
      finally {
        this.ocultarOcupado()
      }
    }
  },
  computed: {
    ...mapGetters('sesion', ['saludo']),
    erroresEmail() {
      let errores = []
      if (!this.$v.formulario.email.$dirty) { return errores }
      if (!this.$v.formulario.email.required) { errores.push('Ingresa tu email.') }
      if (!this.$v.formulario.email.email) { errores.push('Ingresa un email válido.') }
      return errores
    },
    erroresPassword() {
      let errores = []
      if (!this.$v.formulario.password.$dirty) { return errores }
      if (!this.$v.formulario.password.required) { errores.push('Ingresa tu password.') }
      if (!this.$v.formulario.password.minLength) { errores.push('Ingresa al menos 6 caracteres.') }
      if (!this.$v.formulario.password.maxLength) { errores.push('Ingresa máximo 20 caracteres.') }
      return errores
    },
    erroresEmailEnvio() {
      let errores = []
      if (!this.$v.emailEnvio.$dirty) { return errores }
      if (!this.$v.emailEnvio.required) { errores.push('Ingresa tu email.') }
      if (!this.$v.emailEnvio.email) { errores.push('Ingresa un email válido.') }
      return errores
    }
  }
}
</script>
