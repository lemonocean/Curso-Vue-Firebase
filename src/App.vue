<template>
  <v-app>
    <v-navigation-drawer v-model="menu" app temporary>
      <v-list>
        <v-list-tile :to="{ path: '/' }">
          <v-list-tile-action>
            <v-icon>home</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Inicio'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="usuario" :to="{ name: 'perfil', params: { userName: usuario.userName } }">
          <v-list-tile-action>
            <v-icon>account_circle</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Perfil'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="!usuario" :to="{ name: 'login' }">
          <v-list-tile-action>
            <v-icon>arrow_forward</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Ingresar'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile v-if="usuario" @click="salir">
          <v-list-tile-action>
            <v-icon>arrow_back</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="'Salir'"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="primary" dark app>
      <v-toolbar-side-icon @click="menu = !menu"></v-toolbar-side-icon>
      <v-toolbar-title @click="$router.push({ name: 'home' })" class="headline logo">
        <span>{{ titulo }}</span>
      </v-toolbar-title>   
      <v-spacer></v-spacer>  
      <router-link v-if="usuario" class="nombre" :to="{ name: 'perfil', params: { userName: usuario.userName } }">
        <v-layout align-center>
          <v-avatar size="32" class="mr-2">
            <v-img :src="usuario.fotoPerfil32"></v-img>
          </v-avatar>
          <span>{{ usuario.nombres }}</span> 
        </v-layout>
      </router-link>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view></router-view>
        </v-slide-y-transition>
      </v-container>
    </v-content>

    <v-snackbar v-model="notificacion.visible" :color="notificacion.color" multi-line top :timeout="6000" dark>
      {{notificacion.mensaje }}
      <v-btn color="white" flat @click="ocultarNotificacion">
        Cerrar
      </v-btn>
    </v-snackbar>

    <v-dialog v-model="ocupado.visible" max-width="400" persistent>
      <v-card>
        <v-toolbar color="primary" dark card>
          <v-toolbar-title>
            {{ ocupado.titulo }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="subheading">
          {{ ocupado.mensaje }}
        </v-card-text>
        <v-card-text>
          <v-progress-linear :indeterminate="true" color="primary"></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-footer color="primary" dark>
      <v-layout justify-center>
        <span>Curso Vue.js y Firebase - Jorge Bustamante</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>

import Home from '@/views/Home.vue'
import Registro from '@/views/usuario/Registro.vue'
import Login from '@/views/usuario/Login.vue'
import Perfil from '@/views/usuario/Perfil.vue'

import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  components: { Home, Registro, Login, Perfil },
  name: 'App',
  data () {
    return {
      titulo: 'Súper Ópera',
      menu: false
    }
  },
  computed: {
    ...mapState(['notificacion', 'ocupado']),
    ...mapState('sesion', ['usuario'])
  },
  methods: {
    ...mapMutations(['ocultarNotificacion']),
    ...mapActions('sesion', ['cerrarSesion']),
    salir() {
      this.cerrarSesion()
      this.menu = false
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style>

@import url('https://fonts.googleapis.com/css?family=Great+Vibes');

.logo {
  font-family: 'Great Vibes', cursive !important;
  cursor: pointer;
}

.nombre {
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
}

</style>
