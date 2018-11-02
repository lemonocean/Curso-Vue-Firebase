<template>
  <div id="app" class="principal">
    <span>{{ titulo }}</span>
    <div>
      <button @click="componenteActual = item.nombre" v-for="(item, index) in menu" :key="index" class="menu">{{ item.descripcion }}</button>
    </div>
    <component :is="componenteActual"></component>
  </div>
</template>

<script>
import Entrada from '@/views/Entrada.vue'
import Home from '@/views/Home.vue'

import Perfil from '@/views/usuario/Perfil.vue'
import Login from '@/views/usuario/Login.vue'
import Registro from '@/views/usuario/Registro.vue'

export default {
  components: { Entrada, Home, Perfil, Login, Registro },
  name: 'App',
  data() {
    return {
      titulo: 'Entradas',
      componenteActual: 'entrada',
      menu: [
        { descripcion: 'Home', nombre: 'home' },
        { descripcion: 'Entradas', nombre: 'entrada' },
        { descripcion: 'Perfil', nombre: 'perfil' },
        { descripcion: 'Login', nombre: 'login' },
        { descripcion: 'Registro', nombre: 'registro' }
      ]
    }
  }
}
</script>

<style>

html {
  font-size: 62.5% !important; /* 10px / 16px = 0.625 */
}

.menu {
  color: white;
  background-color: transparent;
  font-weight: normal;
  font-size: 1.8rem;
  margin: 3px 2px;
}

.principal {
  background-color: #a21010;
  padding: 10px;
  color: white;
  border-radius: 5px;
  width: 400px;
  font-size: 3rem;
  text-align: center;
}

a {
  text-decoration: none;
  color: #553f75;
}

button {
  background-color: #553f75;
  color: white;
  font-size: 2.4rem;
  font-weight: bold;
  border-style: none;
  border-radius: 5px;
  padding: 3px 10px;
  margin: 3px 5px;
  min-width: 35px;  
  cursor: pointer;
}

button:focus {
  outline: 0;
}

input[type='text'] {
  border-radius: 5px;
  font-size: 2.4rem;
  width: 100%;
  line-height: 4rem;
  padding: 3px;
}

</style>
