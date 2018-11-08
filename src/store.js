import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: null,
    notificacion: {
      visible: false,
      mensaje: '',
      color: 'info'
    }
  },
  mutations: {
    actualizarUsuario(state, usuario) {
      state.usuario = usuario
    },
    mostrarInformacion(state, mensaje) {
      state.notificacion.mensaje = mensaje
      state.notificacion.color = 'info'
      state.notificacion.visible = true
    },
    mostrarExito(state, mensaje) {
      state.notificacion.mensaje = mensaje
      state.notificacion.color = 'success'
      state.notificacion.visible = true
    },
    mostrarAdvertencia(state, mensaje) {
      state.notificacion.mensaje = mensaje
      state.notificacion.color = 'warning'
      state.notificacion.visible = true
    },
    mostrarError(state, mensaje) {
      state.notificacion.mensaje = mensaje
      state.notificacion.color = 'error'
      state.notificacion.visible = true
    },
    ocultarNotificacion(state) {
      state.notificacion.visible = false
    }
  },
  actions: {

  },
  getters: {

  }
})
