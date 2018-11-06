<template>
  <v-layout justify-center align-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-slide-y-transition mode="out-in">
        <v-card v-if="vista == 1" :key="1" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>
              Regístrate
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field @blur="$v.f1.email.$touch()" :error-messages="erroresEmail" v-model="f1.email" label="Email"></v-text-field>
            <v-text-field @blur="$v.f1.password.$touch()" :error-messages="erroresPassword" v-model="f1.password" label="Password" type="password"></v-text-field>
            <v-text-field @keyup.enter="siguiente(1)" @blur="$v.f1.repetirPassword.$touch()" :error-messages="erroresRepetirPassword" v-model="f1.repetirPassword" label="Repetir Password" type="password"></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout justify-end>
              <v-btn :depressed="$v.f1.$invalid" :disabled="$v.f1.$invalid" @click="siguiente(1)" color="secondary">Siguiente</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
        <v-card v-if="vista == 2" :key="2" class="elevation-6">
          <v-toolbar color="primary" dark card>
            <v-toolbar-title>
              Ingresa tus Nombres y Apellidos
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-text-field label="Nombres"></v-text-field>
            <v-text-field label="Apellidos"></v-text-field>
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
                  <v-btn @click="vista++" color="secondary">Siguiente</v-btn>
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
              <v-date-picker v-model="fechaNacimiento" reactive locale="es-co" class="elevation-3"></v-date-picker>
            </v-layout>
          </v-card-text>
          <v-card-text>
            <v-layout justify-end>
              <v-btn color="secondary">Registrarse</v-btn>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-slide-y-transition>
    </v-flex>
  </v-layout>
</template>

<script>
import { required, email, minLength, maxLength, sameAs } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      vista: 1,
      f1: {
        email: '',
        password: '',
        repetirPassword: ''
      },
      fechaNacimiento: null
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
    }
  },
  methods: {
    siguiente(vista) {
      switch (vista) {
        case 1:
          if (this.$v.f1.$invalid) {
            this.$v.f1.$touch()
            return
          }
          else {
            this.vista++
          }
          break
      }
    }
  },
  computed: {
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
    }
  }
}
</script>
