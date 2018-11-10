import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/usuario/Login.vue'
import Registro from './views/usuario/Registro.vue'
import Perfil from './views/usuario/Perfil.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/sesion/login',
      name: 'login',
      component: Login
    },
    {
      path: '/sesion/registro',
      name: 'registro',
      component: Registro
    },
    {
      path: '/usuario/perfil',
      name: 'perfil',
      component: Perfil
    }
  ]
})
