<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card class="elevation-6">
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            Ingresa tus Credenciales
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-text-field label="Email" autofocus v-model="formulario.email" :error-messages="erroresEmail" @blur="$v.formulario.email.$touch()"></v-text-field>
          <v-text-field label="Password" @keyup.enter="ingresar" v-model="formulario.password" :error-messages="erroresPassword" @blur="$v.formulario.password.$touch()" type="password"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn @click="ingresar" :depressed="$v.formulario.$invalid" :disabled="$v.formulario.$invalid" color="secondary">Ingresar</v-btn>
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
import { auth } from '@/firebase'

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
    async ingresar() {
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

        this.mostrarExito(this.saludo)
        this.$router.push({ name: 'home' })
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
