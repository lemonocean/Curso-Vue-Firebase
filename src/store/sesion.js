import { auth, db } from '@/firebase'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    usuario: null
  },
  mutations: {
    actualizarUsuario(state, usuario) {
      state.usuario = usuario
    },
    actualizarNombresApellidos(state, payload) {
      if(!state.usuario) { return }

      state.usuario.nombres = payload.nombres
      state.usuario.apellidos = payload.apellidos
    },
    actualizarDescripcion(state, descripcion) {
      if(!state.usuario) { return }

      state.usuario.descripcion = descripcion
    },
    actualizarBiografia(state, biografia) {
      if(!state.usuario) { return }

      state.usuario.biografia = biografia
    }
  },
  actions: {
    async iniciarSesion({ commit, getters }, uid) {
      try {
        let doc = await db.collection('usuarios')
                          .doc(uid)
                          .get()

        if(doc.exists) {
          let usuario = doc.data()
          commit('actualizarUsuario', usuario)

          switch(router.currentRoute.name) {
            case 'login':
              commit('mostrarExito', getters.saludo, { root: true })
              router.push({ name: 'home' })
              break

            case 'acciones-email':
              commit('mostrarExito', getters.saludo + ', tu contraseña ha sido cambiada exitosamente.', { root: true})
              router.push({ name: 'home' })
              break
          }
          
        }
        else {
          router.push({ name: 'registro' })
        }
      }
      catch (error) {
        commit('mostrarError', 'Ocurrió un error consultando tu información.', { root: true })
      }
    },
    cerrarSesion({ commit }) {
      auth.signOut()
      commit('actualizarUsuario', null)
    }
  },
  getters: {
    saludo(state) {
      if (!state.usuario) {
        return ''
      }

      let vocal = state.usuario.sexo && state.usuario.sexo == 'F' ? 'a' : 'o'
      return `¡Bienvenid${vocal} ${state.usuario.nombres}!`
    }
  }
}