<template>
  <v-app>
    <v-toolbar color="primary" dark app>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{ titulo }}</span>
      </v-toolbar-title>      
    </v-toolbar>

    <v-content>
      <home />
    </v-content>
  </v-app>
</template>

<script>

import Home from '@/views/Home.vue'

export default {
  components: { Home },
  name: 'App',
  data () {
    return {
      titulo: 'Súper Ópera'
    }
  }
}
</script>
