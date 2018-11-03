<template>
  <v-app>
    <v-toolbar color="primary" dark app>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{ titulo }}</span>
      </v-toolbar-title>      
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <registro />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>

import Home from '@/views/Home.vue'
import Registro from '@/views/usuario/Registro.vue'

export default {
  components: { Home, Registro },
  name: 'App',
  data () {
    return {
      titulo: 'Súper Ópera'
    }
  }
}
</script>
