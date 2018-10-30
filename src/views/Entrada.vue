<template>
  <div>
    <anuncio />
    <cliente :email="email" @onCambioEmail="actualizarEmail" />
    <email :emailRecibido="email" @onCambioEmail="actualizarEmail" />
    <firma />
    <boletos />    
  </div>  
</template>

<script>
import Cliente from '@/components/Cliente.vue'
import Anuncio from '@/components/Anuncio.vue'
import Boletos from '@/components/Boletos.vue'
import Firma from '@/components/Firma.vue'
import Email from '@/components/Email.vue'

export default {
  components: { Cliente, Anuncio, Boletos, Firma, Email },
  data() {
    return {
      email: ''
    }
  },
  methods: {
    actualizarEmail(email) {
      this.email = email
    }
  }
}
</script>

<style>

.seccion {
  font-size: 2.4rem;
  color: #202020;
  background-color: #e9e9e9;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
}

.atributo {
  margin: 10px;
}

</style>
