<template>
  <v-layout justify-center align-start>
    <v-card max-width="250">
      <v-toolbar color="primary" dark card>
        <v-toolbar-title>
          Foto de Perfil Actual
        </v-toolbar-title>        
      </v-toolbar>
      <v-card-text>
        <v-img :src="fotoPerfil" alt="Foto de Perfil"></v-img>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>

import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('sesion', ['usuario']),
    ...mapGetters('sesion', ['fotoPerfil'])
  }
}
</script>
