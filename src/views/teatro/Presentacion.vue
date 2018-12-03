<template>
  <v-layout justify-center align-start>
    <v-layout v-if="presentacion && asientos" column>
      <v-layout column justify-center text-xs-center my-3 class="secondary--text">
        <h3 class="display-2">{{ obra.titulo }}</h3>
        <h4 class="display-1">{{ teatro.nombre }}</h4>
        <h5 class="headline">{{ fechaPresentacion }}</h5>
      </v-layout>
      <v-divider></v-divider>
      <v-layout column justify-center my-3>
        <div class="asientos">
          <v-card v-for="asiento in asientos" :key="asiento.aid" :style="'grid-column: ' + asiento.x + '; grid-row: ' + asiento.y + ';'">
            <v-icon :color="asiento.color">lens</v-icon>
          </v-card>
        </div>
      </v-layout>
    </v-layout>
  </v-layout>
</template>

<script>

import { db } from '@/firebase'
import { mapState, mapMutations } from 'vuex'
import { generarFormatoFecha, generarFormatoHora } from '@/utilidades/formatos'

export default {
  data() {
    return {
      teatro: null,
      obra: null,
      presentacion: null,
      asientos: null
    }
  },
  computed: {
    ...mapState('sesion', ['usuario']),
    fechaPresentacion() {
      if (!this.presentacion) { return '' }

      let fecha = this.presentacion.fecha.toDate()

      return generarFormatoFecha(fecha, '/') + ' ' + generarFormatoHora(fecha)
    }
  },
  created() {
    this.consultarInformacion()
  },
  methods: {
    ...mapMutations(['mostrarExito', 'mostrarError', 'mostrarOcupado', 'ocultarOcupado']),
    async consultarInformacion() {
      let oid = this.$route.params.oid
      let tid = this.$route.params.tid
      let fecha = this.$route.params.fecha

      let pid = `${oid}-${tid}-${fecha}`

      this.mostrarOcupado({ titulo: 'Consultando Información', mensaje: 'Consultando la información de la presentación...' })

      try {
        let teatroDoc = await db.collection('teatros')
          .doc(tid)
          .get()

        if (teatroDoc.exists) {
          this.teatro = teatroDoc.data()
        }
        else {
          this.$router.push({ name: '404' })
          return
        }

        let obraDoc = await db.collection('obras')
          .doc(oid)
          .get()

        if (obraDoc.exists) {
          this.obra = obraDoc.data()
        }
        else {
          this.$router.push({ name: '404' })
          return
        }

        let presentacionDoc = await db.collection('obras')
          .doc(oid)
          .collection('presentaciones')
          .doc(pid)
          .get()

        if (presentacionDoc.exists) {
          this.presentacion = presentacionDoc.data()
        }
        else {
          this.$router.push({ name: '404' })
          return
        }

        this.asientos = this.teatro.asientos.map(asiento => {
          let precio = this.obra.categorias.find(item => item.categoria == asiento.categoria).precio
          let color = this.teatro.categorias.find(item => item.categoria == asiento.categoria).color

          return {
            aid: asiento.x + '-' + asiento.y,
            categoria: asiento.categoria,
            descripcion: asiento.descripcion,
            x: asiento.x,
            y: asiento.y,
            precio,
            color
          }
        })
      }
      catch (error) {
        this.mostrarError('Ocurrió un error consultando la información de la presentación.')
        this.$router.push({ name: '404' })
      }
      finally {
        this.ocultarOcupado()
      }
    }
  }
}
</script>

<style>

.asientos {
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
}

</style>
