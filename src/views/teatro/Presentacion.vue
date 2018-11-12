<template>
  <v-layout justify-center align-center>
    <v-card v-if="presentacion">
      <v-card-text>
        <span>Obra: {{ presentacion.obra.titulo }}</span>
      </v-card-text>
      <v-card-text>
        <span>Teatro: {{ presentacion.teatro.nombre }}</span>
      </v-card-text>
      <v-card-text>
        <span>Fecha: {{ presentacion.fecha }}</span>
      </v-card-text>
    </v-card>
  </v-layout>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data() {
    return {
      presentacion: null
    }
  },
  computed: {
    ...mapState('teatro', ['obras'])
  },
  created() {
    let oid = this.$route.params.oid
    let tid = this.$route.params.tid
    let fecha = this.$route.params.fecha

    let pid = `${oid}-${tid}-${fecha}`

    let obra = this.obras.find(o => o.oid == oid)

    if(!obra) {
      this.$router.push({ name: '404' })
    }
    else {
      this.presentacion = obra.presentaciones.find(p => p.pid == pid)

      if(!this.presentacion) {
        this.$router.push({ name: '404' })
      }
    }
  }
}
</script>
