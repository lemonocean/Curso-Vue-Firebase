<template>
  <v-layout column justify-center text-xs-center>
    <div class="home-titulo">
      <h1>Súper Ópera</h1>
    </div>
    <v-layout wrap align-center>
      <v-flex xs12 sm6 md4 lg3 v-for="obra in obras" :key="obra.oid">
        <v-card class="elevation-5 ma-3" :to="{ name: 'obra', params: { oid: obra.oid } }">
          <v-img :src="obra.portada">
            <v-layout align-end justify-center fill-height>
              <v-spacer></v-spacer>
              <v-card-text class="home-obra-titulo">
                {{ obra.titulo }}
              </v-card-text>
            </v-layout>
          </v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<script>

import { db } from '@/firebase'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      obras: []
    }
  },
  created() {
    this.consultarObras()
  },
  methods: {
    ...mapMutations(['mostrarAdvertencia', 'mostrarError']),
    async consultarObras() {
      try {
        let docs = await db.collection('obras')
                           .where('activo', '==', true)
                           .get()

        docs.forEach(doc => {
          this.obras.push(doc.data())
        })

        if (this.obras.length == 0) {
          this.mostrarAdvertencia('No hay obras disponibles en el momento.')
        }
      }
      catch (error) {
        this.mostrarError('Ocurrió un error consultando las obras. Inténtalo más tarde.')
      }
    }
  }
}
</script>


<style>

.home-titulo {
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  color: #553f75;
  text-shadow: 1px 1px 5px #acacac;
}

.home-obra-titulo {
  font-size: 2.4rem;
  color: white;
  opacity: 0.9;
  vertical-align: end;
}

</style>
