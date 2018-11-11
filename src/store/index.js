import Vue from 'vue'
import Vuex from 'vuex'
import sesion from './sesion'
import teatro from './teatro'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notificacion: {
      visible: false,
      mensaje: '',
      color: 'info'
    },
    ocupado: {
      visible: false,
      titulo: '',
      mensaje: ''
    }
  },
  mutations: {
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
    },
    mostrarOcupado(state, ocupado) {
      state.ocupado.titulo = ocupado.titulo
      state.ocupado.mensaje = ocupado.mensaje
      state.ocupado.visible = true
    },
    ocultarOcupado(state) {
      state.ocupado.visible = false
    }
  },
  actions: {

  },
  getters: {
    
  },
  modules: {
    sesion,
    teatro
  }
})
