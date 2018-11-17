<template>
  <div>
  </div>
</template>

<script>

import { auth } from '@/firebase'
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['mostrarExito', 'mostrarError', 'mostrarOcupado', 'ocultarOcupado']),
    async validar() {
      let mode = this.$route.query.mode
      let actionCode = this.$route.query.oobCode

      switch(mode) {
        case 'verifyEmail':

          this.mostrarOcupado({ titulo: 'Verificando Código', mensaje: 'Validando el código de verificación...' })

          try {
            await auth.applyActionCode(actionCode)
            this.mostrarExito('Email validado con éxito. Ingresa tus credenciales para continuar')
            this.$router.push({ name: 'login' })
          }
          catch(error) {
            this.mostrarError('No fue posible validar tu dirección de email.')
          }
          finally {
            this.ocultarOcupado()
          }

          break
      }
    }
  },
  created() {
    this.validar()
  }
}
</script>
