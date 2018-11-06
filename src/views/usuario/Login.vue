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
          <v-text-field label="Email" v-model="email" :error-messages="erroresEmail" @blur="$v.email.$touch()"></v-text-field>
          <v-text-field label="Password" type="password"></v-text-field>
        </v-card-text>
        <v-card-text>
          <v-layout justify-end>
            <v-btn @click="vista++" color="secondary">Siguiente</v-btn>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>

import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: ''
    }
  },
  computed: {
    erroresEmail() {
      let errores = []
      if(!this.$v.email.$dirty) { return errores }
      if(!this.$v.email.required) { errores.push('Ingresa tu email.') }
      if(!this.$v.email.email) { errores.push('Ingresa un email válido.') }
      return errores
    }
  },
  validations: {
    email: {
      required,
      email
    }
  }
}
</script>
