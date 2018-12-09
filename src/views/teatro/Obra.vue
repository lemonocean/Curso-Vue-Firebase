<template>
  <v-layout justify-center text-xs-center>
    <v-flex v-if="obra" xs12 sm10 md12 lg8>
      <h4 class="display-1 secondary--text mt-1">¡Reserva tus entradas para</h4>
      <h2 class="display-3 secondary--text mb-3">{{ obra.titulo }}!</h2>     
      <v-layout wrap align-center>
        <v-flex xs12 md6>
          <v-card class="ma-3">
            <v-img :src="obra.portada"></v-img>
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
              @change="consultarHorarios"
              :allowed-dates="validarFecha"
              :events="fechasActivas"
              :event-color="f => f < fechaActualTexto ? 'grey lighten-1' : 'green darken-1'"
            ></v-date-picker>
            <v-card-text>
              <v-progress-linear v-if="consultandoHorarios" :indeterminate="true"></v-progress-linear>
              <v-layout v-else justify-center text-xs-center>
                <v-list two-line>
                  <v-list-tile v-for="(presentacion, index) in presentaciones" :key="index">
                    <v-list-tile-action>
                      <v-btn color="secondary" :to="{ path: presentacion.url }" >Reservar</v-btn>
                    </v-list-tile-action>

                    <v-list-tile-content class="ml-3">
                      <v-list-tile-title>{{ presentacion.fecha }}</v-list-tile-title>
                      <v-list-tile-sub-title>{{ presentacion.lugar }}</v-list-tile-sub-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </v-list>
              </v-layout>
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
import { generarFormatoFecha, generarFormatoHora } from '@/utilidades/formatos'

export default {
  data() {
    return {
      obra: null,
      fecha: null,
      fechaActual: new Date(),
      fechaActualTexto: generarFormatoFecha(new Date(), '-'),
      fechaMinima: null,
      fechaMaxima: null,
      consultandoHorarios: false,
      presentaciones: [],
      zonaHoraria: -5,
      fechasActivas: null
    }
  },
  methods: {
    ...mapMutations(['mostrarError']),
    validarFecha(fecha) {
      if (!this.fechasActivas) return false
      if (fecha < this.fechaActualTexto) return false
      return this.fechasActivas.indexOf(fecha) !== -1
    },
    async consultarHorarios() {
      let fechaInicial = new Date(this.fecha)
      fechaInicial.setHours(fechaInicial.getHours() - this.zonaHoraria)

      let fechaFinal = new Date(fechaInicial)
      fechaFinal.setDate(fechaFinal.getDate() + 1)

      try {
        this.consultandoHorarios = true

        let resultado = await db.collection('obras')
                                .doc(this.obra.oid)
                                .collection('presentaciones')
                                .where('fecha', '>=', fechaInicial)
                                .where('fecha', '<', fechaFinal)
                                .get()

        this.presentaciones = resultado.docs.map(doc => {
          let presentacion = doc.data()
          let fechaPresentacion = presentacion.fecha.toDate()
          fechaPresentacion.setHours(fechaPresentacion.getHours() + fechaPresentacion.getTimezoneOffset() / 60 + this.zonaHoraria)

          return {
            pid: presentacion.pid,
            fecha: `${generarFormatoFecha(fechaPresentacion, '/')} ${generarFormatoHora(fechaPresentacion)}`,
            lugar: presentacion.teatro.nombre,
            url: `/${this.obra.oid}/${presentacion.teatro.tid}/${generarFormatoFecha(fechaPresentacion, '-', true)}`
          }
        })
      }
      catch (error) {
        this.mostrarError('Ocurrió un error consultando los horarios para la fecha seleccionada.')
      }
      finally {
        this.consultandoHorarios = false
      }
    },
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
              let fecha = timestamp.toDate()
              fecha.setHours(fecha.getHours() + fecha.getTimezoneOffset() / 60 + this.zonaHoraria)
              return fecha
            })

            fechasObra.sort((a, b) => { return a - b })

            let fechaMinimaVigente = fechasObra.find(f => f >= this.fechaActual)

            if (fechaMinimaVigente) {
              this.fechaMinima = generarFormatoFecha(fechaMinimaVigente, '-')
              this.fechaMaxima = generarFormatoFecha(fechasObra[fechasObra.length - 1], '-')

              this.fechasActivas = fechasObra.map(fecha => {
                return generarFormatoFecha(fecha, '-')
              })

              this.fechasActivas = [...new Set(this.fechasActivas)]

              this.fecha = this.fechaMinima
              this.consultarHorarios()
            }
          }
        }
      }
      catch (error) {
        this.mostrarError('Ocurrió un error consultando la obra.')
      }
      finally {
        if (!this.obra) {
          this.$router.push({ name: '404' })
        }
      }
    }
  },
  created() {
    this.consultarObra()
  }
}
</script>
