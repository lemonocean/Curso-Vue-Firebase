import { auth, db, storage } from '@/firebase'
import router from '@/router'

const dimensiones = [512, 256, 128, 64, 32]

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
    },
    actualizarFotoPerfilDimension(state, payload) {
      if (!state.usuario) { return }

      switch (payload.dimension) {
        case 32:
          state.usuario.fotoPerfil32 = payload.url
          break

        case 64:
          state.usuario.fotoPerfil64 = payload.url
          break

        case 128:
          state.usuario.fotoPerfil128 = payload.url
          break

        case 256:
          state.usuario.fotoPerfil256 = payload.url
          break

        case 512:
          state.usuario.fotoPerfil512 = payload.url
          break
      }
    }
  },
  actions: {
    actualizarFotoPerfil({ state, commit }, fotoPerfil) {
      commit('actualizarFotoPerfil', fotoPerfil)

      let ref = storage.ref()
      let uid = state.usuario.uid

      dimensiones.forEach(dimension => {
        ref.child(`usuarios/${uid}/fotos-perfil/${fotoPerfil}-${dimension}x${dimension}.jpg`)
           .getDownloadURL()
           .then(url => {
             commit('actualizarFotoPerfilDimension', { dimension, url })
           })
      })
    },
    async iniciarSesion({ commit, getters }, uid) {
      try {
        let doc = await db.collection('usuarios')
                          .doc(uid)
                          .get()

        if(doc.exists) {
          let usuario = doc.data()

          let fotoUsuario = require('@/assets/fotoUsuario.png')

          usuario.fotoPerfil32 = fotoUsuario
          usuario.fotoPerfil64 = fotoUsuario
          usuario.fotoPerfil128 = fotoUsuario
          usuario.fotoPerfil256 = fotoUsuario
          usuario.fotoPerfil512 = fotoUsuario

          if (usuario.fotoPerfil) {
            let ref = storage.ref()
            let uid = usuario.uid
            let fotoPerfil = usuario.fotoPerfil
            
            dimensiones.forEach(dimension => {
              ref.child(`usuarios/${uid}/fotos-perfil/${fotoPerfil}-${dimension}x${dimension}.jpg`)
                .getDownloadURL()
                .then(url => {
                  commit('actualizarFotoPerfilDimension', { dimension, url })
                })
            })
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