import { auth, db, storage } from '@/firebase'
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
    },
    actualizarFotoPerfil(state, fotoPerfil) {
      if(!state.usuario) { return }

      state.usuario.fotoPerfil = fotoPerfil
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

          if (usuario.fotoPerfil) {
            let ref = storage.ref()
            let uid = usuario.uid
            let fotoPerfil = usuario.fotoPerfil
            let urlBase = `usuarios/${uid}/fotos-perfil/${fotoPerfil}-`
            
            ref.child(urlBase + '32x32.jpg').getDownloadURL().then(url => { usuario.fotoPerfil32 = url })
            ref.child(urlBase + '64x64.jpg').getDownloadURL().then(url => { usuario.fotoPerfil64 = url })
            ref.child(urlBase + '128x128.jpg').getDownloadURL().then(url => { usuario.fotoPerfil128 = url })
            ref.child(urlBase + '256x256.jpg').getDownloadURL().then(url => { usuario.fotoPerfil256 = url })
            ref.child(urlBase + '512x512.jpg').getDownloadURL().then(url => { usuario.fotoPerfil512 = url })
          }
          else {
            let fotoUsuario = require('@/assets/fotoUsuario.png')

            usuario.fotoPerfil32 = fotoUsuario
            usuario.fotoPerfil64 = fotoUsuario
            usuario.fotoPerfil128 = fotoUsuario
            usuario.fotoPerfil256 = fotoUsuario
            usuario.fotoPerfil512 = fotoUsuario
          }

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