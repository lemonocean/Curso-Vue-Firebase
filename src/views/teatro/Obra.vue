<template>
  <v-layout justify-center text-xs-center>
    <v-flex v-if="obra" xs12 sm10 md12 lg8>
      <h4 class="display-1 secondary--text mt-1">¡Reserva tus entradas para</h4>
      <h2 class="display-3 secondary--text mb-3">{{ obra.titulo }}!</h2>     
      <v-layout wrap align-center>
        <v-flex xs12 md6>
          <v-card class="ma-3">
            <v-img :src="require(`@/assets/obras/${obra.portada}`)"></v-img>
            <v-card-text class="subheading font-italic text-xs-justify">{{ obra.descripcion }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 md6>
          <v-card class="ma-3">
            <v-date-picker
              class="elevation-0"
              v-model="fecha"
              full-width
              locale="es-co"
              :min="fechaMinima"
              :max="fechaMaxima"
            ></v-date-picker>
            <v-card-text>

            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>

import { db } from '@/firebase'
import { mapMutations } from 'vuex'
import { generarFormatoFecha } from '@/utilidades/formatos'

export default {
  data() {
    return {
      obra: null,
      fecha: null,
      fechaActual: new Date(),
      fechaMinima: null,
      fechaMaxima: null
    }
  },
  methods: {
    ...mapMutations(['mostrarError']),
    async consultarObra() {
      let oid = this.$route.params.oid

      try {
        let doc = await db.collection('obras')
                          .doc(oid)
                          .get()

        if(doc.exists) {
          this.obra = doc.data()

          if (this.obra.fechas && this.obra.fechas.length > 0) {
            let fechasObra = this.obra.fechas.map(timestamp => {
              return timestamp.toDate()
            })

            fechasObra.sort((a, b) => { return a - b })

            let fechaMinimaVigente = fechasObra.find(f => f >= this.fechaActual)

            if (fechaMinimaVigente) {
              this.fechaMinima = generarFormatoFecha(fechaMinimaVigente, '-')
              this.fechaMaxima = generarFormatoFecha(fechasObra[fechasObra.length - 1], '-')
            }
          }
        }
      }
      catch (error) {

      }
      finally {
        if (!this.obra) {
          this.$router.push({ name: '404' })
        }
      }
    }
  },
  created() {
    this.fecha = new Date().toISOString().substring(0, 10)
    this.consultarObra()
  }
}
</script>

<style>
.obra-titulo {
  font-size: 1.5rem;
  color: #553f75;
}
</style>
