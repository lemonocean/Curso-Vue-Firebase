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
            <v-text-field label="Email"></v-text-field>
            <v-text-field label="Password" type="password"></v-text-field>
          </v-card-text>
          <v-card-text>
            <v-layout justify-end>
              <v-btn @click="vista++" color="secondary">Siguiente</v-btn>
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
            <v-layout justify-end>
              <v-btn @click="vista++" color="secondary">Siguiente</v-btn>
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
              <v-date-picker v-model="fechaNacimiento" reactive locale="es-co"  class="elevation-3"></v-date-picker>
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
export default {
  data() {
    return {
      vista: 1,
      fechaNacimiento: null
    }
  }
}
</script>
