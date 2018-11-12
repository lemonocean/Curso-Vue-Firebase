<template>
  <v-layout justify-center text-xs-center>
    <v-flex v-if="obra" xs12 sm6 md4 lg3>
      <div class="obra-titulo">
        <h1>{{ obra.titulo }}</h1>
      </div>
      <v-card class="elevation-2 ma-3">
        <v-img :src="obra.portada"></v-img>
      </v-card>
      <v-btn :to="{ name: 'presentacion', params: { oid: p.obra.oid, tid: p.teatro.tid, fecha: p.fecha } }" v-for="p in obra.presentaciones" :key="p.pid">
        {{ `${p.teatro.nombre} - ${p.fecha}` }}
      </v-btn>
    </v-flex>
  </v-layout>
</template>

<script>

import { mapState } from 'vuex'

export default {
  data() {
    return {
      obra: null
    }
  },
  computed: {
    ...mapState('teatro', ['obras'])
  },
  created() {
    let oid = this.$route.params.oid

    this.obra = this.obras.find(o => o.oid == oid)

    if(!this.obra) {
      this.$router.push({ name: '404' })
    }
  }
}
</script>

<style>

.obra-titulo {
  font-size: 1.5rem;
  color: #553f75;
}

</style>
