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
    cerrarSesion({
      commit
    }) {
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