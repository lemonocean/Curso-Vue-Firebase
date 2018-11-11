<template>
  <v-layout text-xs-center align-start justify-center>
    <v-card v-if="usuario" class="elevation-6">
      <v-card-text>
        <div class="ma-2">
          {{ usuario.nombres + ' ' + usuario.apellidos }}
        </div>
        <v-img class="ma-2 fotoPerfil" :src="usuario.fotoPerfil"></v-img>
        <div class="ma-2">
          {{ usuario.descripcion }}
        </div>
        <a :href="usuario.biografia" target="_blank" class="ma-2 link">Biografia</a>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>
import { mapState } from 'vuex'
import store from '@/store'

export default {
  computed: {
    ...mapState('sesion', ['usuario'])
  }
  // beforeRouteEnter (to, from, next) {
  //   if(store.state.sesion.usuario) {
  //     next()
  //   }
  //   else {
  //     next({ name: 'login' })
  //   }
  // }
}
</script>


<style>

.fotoPerfil {
  width: 200px;
  height: 100%;
}

.link {
  text-decoration: none;
  font-size: 1rem;
  color: #553f75;
}

</style>
