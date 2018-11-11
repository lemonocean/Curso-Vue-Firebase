import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import Home from './views/Home.vue'
import Login from './views/usuario/Login.vue'
import Registro from './views/usuario/Registro.vue'
import Perfil from './views/usuario/Perfil.vue'

Vue.use(Router)

const router = new Router({
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
      component: Perfil,
      meta: {
        autenticado: true
      }
      // beforeEnter: (to, from, next) => {
      //   if(store.state.sesion.usuario) {
      //     next()
      //   }
      //   else {
      //     next({ name: 'login' })
      //   }
      // }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.autenticado)) {
    if(store.state.sesion.usuario) {
      next()
    }
    else {
      next({ name: 'login' })
    }
  }
  else {
    next()
  }
})

export default router