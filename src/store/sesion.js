import { auth } from '@/firebase'

export default {
  namespaced: true,
  state: {
    usuario: null
  },
  mutations: {
    actualizarUsuario(state, usuario) {
      state.usuario = usuario
    }
  },
  actions: {
    iniciarSesion({ commit }, uid) {
      let usuario = {
        uid,
        userName: 'newton',
        nombres: 'Isaac',
        apellidos: 'Newton',
        sexo: 'M',
        descripcion: 'Descripción',
        biografia: 'https://es.wikipedia.org/wiki/Isaac_Newton',
        fotoPerfil: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Sir_Isaac_Newton_%281643-1727%29.jpg/220px-Sir_Isaac_Newton_%281643-1727%29.jpg'
      }

      commit('actualizarUsuario', usuario)
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