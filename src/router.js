import Vue from 'vue'
import Router from 'vue-router'
import { auth } from '@/firebase'

import Home from './views/Home.vue'
import NotFound from './views/NotFound.vue'

import AccionesEmail from './views/usuario/AccionesEmail.vue'
import EnvioVerificacionEmail from './views/usuario/EnvioVerificacionEmail.vue'
import Login from './views/usuario/Login.vue'
import Registro from './views/usuario/Registro.vue'
import Perfil from './views/usuario/Perfil.vue'
import EdicionFotoPerfil from './views/usuario/EdicionFotoPerfil.vue'

import CargaInicial from './views/teatro/CargaInicial.vue'
import Obra from './views/teatro/Obra.vue'
import Presentacion from './views/teatro/Presentacion.vue'


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
      path: '/sesion/envio-verificacion-email',
      name: 'envio-verificacion-email',
      component: EnvioVerificacionEmail
    },
    {
      path: '/sesion/acciones-email',
      name: 'acciones-email',
      component: AccionesEmail
    },
    {
      path: '/sesion/edicion-foto-perfil',
      name: 'edicion-foto-perfil',
      component: EdicionFotoPerfil,
      meta: {
        autenticado: true
      }
    },
    {
      path: '/usuario/:userName',
      name: 'perfil',
      component: Perfil,
      meta: {
        autenticado: true
      }
    },
    {
      path: '/admin/carga-inicial',
      name: 'carga-inicial',
      component: CargaInicial
    },
    {
      path: '/obras/:oid',
      name: 'obra',
      component: Obra
    },
    {
      path: '/:oid/:tid/:fecha',
      name: 'presentacion',
      component: Presentacion,
      meta: {
        autenticado: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: NotFound
    },
    {
      path:'*',
      component: NotFound
    }
  ]
})

router.beforeEach((to, from, next) => {
  let user = auth.currentUser

  if(to.matched.some(record => record.meta.autenticado)) {
    if(user) {
      if(user.providerData[0].providerId == 'password' && !user.emailVerified) {
        next({ name: 'envio-verificacion-email' })
      }
      else {
        next()
      }
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