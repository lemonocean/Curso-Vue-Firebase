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
              <a @click="siguiente(1, 'facebook.com')" class="mx-3">
                <v-avatar tile :size="40">
                  <img alt="Ingreso Facebook" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path d='M483.7 0H28.3C12.7 0 0 12.7 0 28.3v455.5C0 499.3 12.7 512 28.3 512h245.2V314H207v-77.5h66.5v-57c0-66.1 40.4-102.1 99.4-102.1 28.3 0 52.5 2.1 59.6 3v69.1h-40.7c-32.1 0-38.3 15.3-38.3 37.6v49.4h76.7l-10 77.5h-66.7v198h130.2c15.6 0 28.3-12.7 28.3-28.3V28.3C512 12.7 499.3 0 483.7 0z' fill='%234267b2'/><path d='M353.5 512V314h66.8l10-77.5h-76.8v-49.4c0-22.4 6.2-37.6 38.3-37.6h40.7V80.4c-7.1-.9-31.4-3-59.6-3-59 0-99.4 36-99.4 102.1v57H207V314h66.5v198h80z' fill='%23fff'/></svg>">
                </v-avatar>
              </a>
              <a @click="siguiente(1, 'google.com')" class="mx-3">
                <v-avatar tile :size="40">
                  <img alt="Ingreso Google" src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='%23ea4335' d='M261.1 0C161 0 74.5 57.4 32.3 141l85.5 66.3c20.1-60.5 76.6-105.5 143.2-105.5 37.6 0 71.3 12.9 97.9 38.3l73.4-73.4C388.1 25.4 330.1 0 261.1 0z'/><path fill='%23fbbc05' d='M117.9 207.4L32.3 141C15 175.6 5.1 214.7 5.1 256s9.9 80.4 27.2 115l85.5-66.3c-5.1-15.4-8-31.8-8-48.6 0-17 3-33.4 8.1-48.7z'/><path fill='%2334a853' d='M347.8 385.7c-22.9 15.4-52.2 24.4-86.7 24.4-66.7 0-123.1-45-143.2-105.5L32.3 371C74.5 454.6 161 512 261.1 512c69.1 0 127.1-22.9 169.4-62l-82.7-64.3z'/><path fill='%234285f4' d='M502.2 209.5H261.1v99h137.8c-5.9 32-24 59.1-51.1 77.3l82.7 64.2c48.4-44.6 76.3-110.2 76.3-188.2.1-18.1-1.5-35.6-4.6-52.3z'/></svg>">
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
            <v-text-field @keyup.enter="siguiente(1, 'password')" @blur="$v.f1.repetirPassword.$touch()" :error-messages="erroresRepetirPassword" v-model="f1.repetirPassword" label="Repetir Password" type="password"></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout justify-end>
              <v-btn :depressed="$v.f1.$invalid" :disabled="$v.f1.$invalid" @click="siguiente(1, 'password')" color="secondary">Siguiente</v-btn>
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
                  <v-btn @click="siguiente(3)" :depressed="$v.fechaNacimiento.$invalid" :disabled="$v.fechaNacimiento.$invalid" color="secondary">Siguiente</v-btn>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card v-if="vista == 4" :key="4" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>
              Ingresa un Nombre de Usuario
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field @blur="$v.userName.$touch()" autofocus :error-messages="erroresUserName" v-model="userName" label="Nombre de Usuario"></v-text-field>
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
                  <v-btn @click="registrar" :depressed="$v.f2.$invalid" :disabled="$v.f2.$invalid" color="secondary">Registrarse</v-btn>
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
import { required, email, minLength, maxLength, sameAs, alphaNum } from 'vuelidate/lib/validators'
import { nombreCompuesto } from '@/utilidades/validaciones'
import { mapMutations, mapGetters } from 'vuex'
import { firebase, auth, db } from '@/firebase'

export default {
  data() {
    return {
      metodo: 'password',
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
      fechaMaxima: null,
      userName: ''
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
    },
    userName: {
      required,
      minLength: minLength(5),
      maxLength: maxLength(25),
      alphaNum
    }
  },
  created() {
    let fechaActual = new Date()
    this.fechaMaxima = new Date(fechaActual.setFullYear(fechaActual.getFullYear() - 13))
      .toISOString()
      .substr(0, 10)

    if(auth.currentUser && !this.$store.state.sesion.usuario) {
      this.metodo = auth.currentUser.providerData[0].providerId
      this.vista = 2
      this.$store.commit('mostrarInformacion', 'Completa tus datos de registro.')
    }
  },
  methods: {
    ...mapMutations(['mostrarOcupado', 'ocultarOcupado', 'mostrarExito', 'mostrarError', 'mostrarAdvertencia']),
    ...mapMutations('sesion', ['actualizarUsuario']),
    siguiente(vista, metodo) {
      switch (vista) {
        case 1:
          if (this.$v.f1.$invalid && metodo == 'password') {
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

        case 3:
          if (this.$v.fechaNacimiento.$invalid) { return }

          this.vista++
          break
      }
    },
    async registrar() {
      if (this.$v.userName.$invalid) { return }

      let userNameExistente = await db.collection('userNames')
                                      .doc(this.userName.toLowerCase())
                                      .get()

      if(userNameExistente.exists) {
        this.mostrarAdvertencia(`El nombre de usuario '${this.userName}', ya está tomado, selecciona uno diferente.`)
        return
      }

      switch (this.metodo) {
        case 'password':
          this.registrarEmail()
          break

        case 'facebook.com':
          this.registrarFacebook()
          break

        case 'google.com':
          this.registrarGoogle()
          break
      }
    },
    async registrarEmail() {
      try {
        this.mostrarOcupado({ titulo: 'Creando Registro', mensaje: 'Estamos registrando tu información...' })

        let uid = null

        if(auth.currentUser) {
          uid = auth.currentUser.uid
        }
        else {
          let cred = await auth.createUserWithEmailAndPassword(this.f1.email, this.f1.password)
          uid = cred.user.uid
        }

        await this.guardarUsuario(uid)

        await auth.currentUser.sendEmailVerification()
        
        this.$router.push({ name: 'envio-verificacion-email' })
      }
      catch (error) {

        switch (error.code) {
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
        let uid = null

        if(auth.currentUser) {
          uid = auth.currentUser.uid
        }
        else {
          let cred = await auth.signInWithPopup(provider)
          uid = cred.user.uid
        }

        await this.guardarUsuario(uid)

        this.$router.push({ name: 'home' })
      }
      catch (error) {
        this.mostrarError('Ocurrió un error registrando tu cuenta.')
      }
    },
    async registrarGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider()

      provider.setCustomParameters({
        'display': 'popup'
      })

      auth.languageCode = 'es_CO'

      try {
        let uid = null

        if(auth.currentUser) {
          uid = auth.currentUser.uid
        }
        else {
          let cred = await auth.signInWithPopup(provider)
          uid = cred.user.uid
        }

        await this.guardarUsuario(uid)

        this.$router.push({ name: 'home' })
      }
      catch (error) {
        this.mostrarError('Ocurrió un error registrando tu cuenta.')
      }
    },
    enter() {
      if (this.vista == 3 && !this.fechaNacimiento) {
        this.$refs.calendario.activePicker = 'YEAR'
      }
    },
    async guardarUsuario(uid) {
      let usuario = {
          uid,
          userName: this.userName,
          nombres: this.f2.nombres,
          apellidos: this.f2.apellidos,
          fechaNacimiento: new Date(this.fechaNacimiento),
          sexo: 'M',
          fotoPerfil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/220px-Sir_Isaac_Newton_%281643-1727%29.jpg'
        }

        let userName = {
          userName: this.userName,
          uid
        }

        let batch = db.batch()

        batch.set(db.collection('usuarios').doc(usuario.uid), usuario)
        batch.set(db.collection('userNames').doc(this.userName.toLowerCase()), userName)

        await batch.commit()

        this.actualizarUsuario(usuario)
        this.mostrarExito(this.saludo)
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
    },
    erroresUserName() {
      let errores = []
      if (!this.$v.userName.$dirty) { return errores }
      if (!this.$v.userName.required) { errores.push('Ingresa tu un nombre de usuario.') }
      if (!this.$v.userName.minLength) { errores.push('Ingresa al menos 5 caracteres.') }
      if (!this.$v.userName.maxLength) { errores.push('Ingresa máximo 25 caracteres.') }
      if (!this.$v.userName.alphaNum) { errores.push('Ingresa solo letras y números, sin espacios.') }
      return errores
    }
  }
}
</script>
