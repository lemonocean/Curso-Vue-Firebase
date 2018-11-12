<template>
  <v-layout align-center justify-center>
    <v-flex xs12 sm8 md6 lg5 xl4>
      <v-card class="elevation-6">
        <v-card-text class="headline">
          No encontramos la página que buscabas
        </v-card-text>
        <v-card-text class="subheading">
          Verifica que la url ingresada sea válida.
        </v-card-text>
        <v-card-actions>
          <v-btn :to="{ name: 'home' }" flat color="secondary">Regresar al Inicio</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
