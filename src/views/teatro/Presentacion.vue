<template>
  <v-layout v-resize="onResize" justify-center align-start>
    <v-layout v-if="presentacion && asientos" column>
      <v-layout column justify-center text-xs-center my-3 class="secondary--text">
        <h3 class="display-2">{{ obra.titulo }}</h3>
        <h4 class="display-1">{{ teatro.nombre }}</h4>
        <h5 class="headline">{{ fechaPresentacion }}</h5>
      </v-layout>
      <v-divider></v-divider>
      <v-layout justify-center my-3>
        <v-flex :shrink="true" class="mr-3">
          <v-layout>
            <v-icon color="grey darken-3" :size="22">add</v-icon>
            <span class="ml-2">Asiento Disponible</span>
          </v-layout>
          <v-layout>
            <v-icon color="grey darken-3" :size="22">person</v-icon>
            <span class="ml-2">Asiento Ocupado</span>
          </v-layout>
          <v-layout>
            <v-icon color="grey darken-3" :size="22">check_circle</v-icon>
            <span class="ml-2">Asiento Seleccionado</span>
          </v-layout>
          <v-layout>
            <v-icon color="grey darken-3" :size="22">monetization_on</v-icon>
            <span class="ml-2">Asiento Pagado</span>
          </v-layout>
        </v-flex>
        <v-flex :shrink="true" class="ml-3">
          <div v-for="categoria in categorias" :key="categoria.precio">
            <v-icon :color="categoria.color" :size="22">lens</v-icon>
            <span class="ml-2">$ {{ categoria.precio }}</span>
          </div>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-slide-y-transition mode="out-in">
        <v-layout column justify-center text-xs-center my-3 v-if="seleccionados && seleccionados.length > 0">
          <span class="subheading font-weight-bold">Tu Reserva</span>
          <v-flex mt-3>
            <v-slide-y-transition group hide-on-leave>
              <v-chip @input="seleccionarAsiento(asiento)" :close="!asiento.cambiandoEstado" :color="asiento.cambiandoEstado ? '#D32F2F' : '#C0CA33'" text-color="white" v-for="asiento in seleccionados" :key="asiento.aid">
                <v-avatar>
                  <v-icon>check_circle</v-icon>
                </v-avatar>
                {{ asiento.descripcion }}: $ {{ asiento.precio }}
              </v-chip>
            </v-slide-y-transition>
          </v-flex>
          <v-layout justify-center mt-2>
            <v-btn @click="pagar" color="secondary" class="subheading">Pagar Total: $ {{ totalSeleccionados.toLocaleString() }}</v-btn>
          </v-layout>
        </v-layout>
      </v-slide-y-transition>
      <v-divider v-if="seleccionados && seleccionados.length > 0"></v-divider>
      <v-slide-y-transition mode="out-in">
        <v-layout column justify-center text-xs-center my-3 v-if="pagados && pagados.length > 0">
          <span class="subheading">Compras Realizadas</span>
          <v-flex mt-3>
            <v-slide-y-transition group hide-on-leave>
              <v-chip v-for="asiento in pagados" :key="asiento.aid" text-color="grey darken-1">
                <v-avatar>
                  <v-icon color="grey darken-1">monetization_on</v-icon>
                </v-avatar>
                {{ asiento.descripcion }}: $ {{ asiento.precio }}
              </v-chip>
            </v-slide-y-transition>
          </v-flex>
          <span class="subheading mt-2">Total: $ {{ totalPagado.toLocaleString() }}</span>
        </v-layout>
      </v-slide-y-transition>
      <v-divider v-if="pagados && pagados.length > 0"></v-divider>
      <v-layout justify-center my-3>
        <v-card color="transparent" class="elevation-0">
          <v-layout justify-center class="escenario">
            <span class="headline">Escenario</span>
          </v-layout>
          <div class="asientos">
            <v-card @click.native="seleccionarAsiento(asiento)" v-for="asiento in asientos" :key="asiento.aid" :color="obtenerColorAsiento(asiento.estado, asiento.color)" class="asiento" :class="aplicarCssAsiento(asiento.estado)" :style="'grid-column: ' + asiento.x + '; grid-row: ' + asiento.y + ';'">
              <v-icon v-if="!asiento.cambiandoEstado" color="white" :size="size">{{obtenerIconoEstado(asiento.estado)}}</v-icon>
              <v-progress-circular v-else indeterminate :size="size" color="white"></v-progress-circular>
            </v-card>
          </div>
        </v-card>
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
      categorias: null,
      asientos: null,
      seleccionados: [],
      totalSeleccionados: 0,
      pagados: [],
      totalPagado: 0,
      size: 27
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

        this.categorias = this.teatro.categorias.map(c => {
          return {
            color: c.color,
            precio: this.obra.categorias.find(item => item.categoria == c.categoria).precio
          }
        })

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
            color,
            estado: 'disponible',
            cambiandoEstado: false
          }
        })

        this.consultarReservas()
      }
      catch (error) {
        this.mostrarError('Ocurrió un error consultando la información de la presentación.')
        this.$router.push({ name: '404' })
      }
      finally {
        this.ocultarOcupado()
      }
    },
    consultarReservas() {      
      db.collection('obras')
        .doc(this.obra.oid)
        .collection('presentaciones')
        .doc(this.presentacion.pid)
        .collection('reservas')
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => { // added, modified, removed
            let reserva = change.doc.data()

            let asiento = this.asientos.find(asiento => asiento.aid == reserva.rid)

            if (change.type == 'added' || change.type == 'modified') {
              if (reserva.usuario.uid == this.usuario.uid) {
                asiento.estado = reserva.estado

                if (asiento.estado == 'seleccionado') {
                  this.seleccionados.push(asiento)
                  this.totalSeleccionados += asiento.precio
                }
                else {
                  this.pagados.push(asiento)
                  this.totalPagado += asiento.precio
                }
              }
              else {
                asiento.estado = 'ocupado'
              }
            }
            else {
              asiento.estado = 'disponible'
              
              if (reserva.usuario.uid == this.usuario.uid) {
                this.seleccionados.splice(this.seleccionados.indexOf(asiento), 1)
                this.totalSeleccionados -= asiento.precio
              }
            }
          })
        },
        () => {
          this.mostrarError('Ocurrió un error actualizando el estado de algunos asientos.')
        })
    },
    async seleccionarAsiento(asiento) {
      if (asiento.estado == 'ocupado' || asiento.estado == 'pagado' || asiento.cambiandoEstado) {
        return
      }

      asiento.cambiandoEstado = true

      let batch = db.batch()

      if (asiento.estado == 'disponible') {
        let reserva = {
          rid: asiento.aid,
          x: asiento.x,
          y: asiento.y,
          fecha: new Date(),
          usuario: {
            uid: this.usuario.uid,
            nombres: this.usuario.nombres,
            apellidos: this.usuario.apellidos
          },
          estado: 'seleccionado'
        }

        let reservaUsuario = {
          id: this.presentacion.pid + '-' + asiento.aid,
          rid: asiento.aid,
          x: asiento.x,
          y: asiento.y,
          fecha: new Date(),
          estado: 'seleccionado',
          presentacion: this.presentacion
        }

        batch.set(
          db.collection('obras')
            .doc(this.obra.oid)
            .collection('presentaciones')
            .doc(this.presentacion.pid)
            .collection('reservas')
            .doc(reserva.rid), reserva
        )

        batch.set(
          db.collection('usuarios')
            .doc(this.usuario.uid)
            .collection('reservas')
            .doc(reservaUsuario.id), reservaUsuario
        )

        try {
          await batch.commit()
        }
        catch (error) {
          this.mostrarError('Ocurrió un error efectuando la reserva. Inténtalo más tarde.')
        }
        finally {
          asiento.cambiandoEstado = false
        }
      }
      else {

        batch.delete(
          db.collection('obras')
            .doc(this.obra.oid)
            .collection('presentaciones')
            .doc(this.presentacion.pid)
            .collection('reservas')
            .doc(asiento.aid)
        )

        batch.delete(
          db.collection('usuarios')
            .doc(this.usuario.uid)
            .collection('reservas')
            .doc(this.presentacion.pid + '-' + asiento.aid)
        )

        try {
          await batch.commit()
        }
        catch (error) {
          this.mostrarError('Ocurrió un error eliminando la reserva.')
        }
        finally {
          asiento.cambiandoEstado = false
        }
      }
    },
    async pagar() {
      this.mostrarOcupado({ titulo: 'Efectuando la Compra', mensaje: 'Se está procesando tu pago...' })

      let batch = db.batch()

      let fecha = new Date()

      this.seleccionados.forEach(asiento => {
        batch.update(
          db.collection('obras')
            .doc(this.obra.oid)
            .collection('presentaciones')
            .doc(this.presentacion.pid)
            .collection('reservas')
            .doc(asiento.aid),
            { estado: 'pagado', fecha }
        )

        batch.update(
          db.collection('usuarios')
            .doc(this.usuario.uid)
            .collection('reservas')
            .doc(this.presentacion.pid + '-' + asiento.aid),
            { estado: 'pagado', fecha }
        )
      })

      try {
        await batch.commit()

        this.seleccionados = []
        this.totalSeleccionados = 0

        this.mostrarExito('Tu compra se ha efectuado con éxito. ¡Disfruta de la Obra!')
      }
      catch (error) {
        this.mostrarError('Ocurrió un error efectuando el pago. Inténtalo nuevamente.')
      }
      finally {
        this.ocultarOcupado()
      }
    },
    onResize() {
      if (window.innerWidth < 400) {
        this.size = 7
      }
      else if (window.innerWidth < 500) {
        this.size = 9
      }
      else if (window.innerWidth < 600) {
        this.size = 12
      }
      else if (window.innerWidth < 900) {
        this.size = 13
      }
      else if (window.innerWidth < 1000) {
        this.size = 19
      }
      else if (window.innerWidth < 1200) {
        this.size = 24
      }
      else {
        this.size = 27
      }
    },
    obtenerIconoEstado (estado) {
      switch (estado) {
        case 'disponible':
          return 'add'
        case 'seleccionado':
          return 'check_circle'
        case 'ocupado':
          return 'person'
        case 'pagado':
          return 'monetization_on'
      }
    },
    obtenerColorAsiento (estado, color) {
      switch (estado) {
        case 'disponible':
          return color
        case 'seleccionado':
          return '#C0CA33'
        case 'ocupado':
        case 'pagado':
          return '#E0E0E0'
      }
    },
    aplicarCssAsiento (estado) {
      switch (estado) {
        case 'disponible':
        case 'seleccionado':
          return 'asiento-cursor-pointer elevation-2'
        case 'ocupado':
        case 'pagado':
          return 'asiento-cursor-not-allowed elevation-0'
      }
    }
  }
}
</script>

<style>

.escenario {
  color: #444;
  border-color: #9e9e9e;
  border-style: solid;
  border-width: 1px;
  padding-top: 30px;
  padding-bottom: 30px;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  margin-bottom: 20px;
}

.asientos {
  display: grid;
  align-items: center;
  align-content: center;
  justify-items: center;
  justify-content: center;
  grid-gap: 12px;
}

.asiento {
  display: grid;
  padding: 10px;
  border-top-left-radius: 20%;
  border-top-right-radius: 20%;
  border-bottom-left-radius: 40%;
  border-bottom-right-radius: 40%;
}

.asiento-cursor-pointer {
  cursor: pointer;
}

.asiento-cursor-not-allowed {
  cursor: not-allowed;
}

@media only screen and (max-width: 1200px) {
  .asientos {
    grid-gap: 6px;
  }

  .asiento {
    padding: 8px;
  }
}

@media only screen and (max-width: 1000px) {
  .asientos {
    grid-gap: 8px;
  }

  .asiento {
    padding: 6px;
  }
}

@media only screen and (max-width: 900px) {
  .asientos {
    grid-gap: 10px;
  }

  .asiento {
    padding: 6px;
  }
}

@media only screen and (max-width: 600px) {
  .asientos {
    grid-gap: 10px;
  }

  .asiento {
    padding: 4px;
  }
}

@media only screen and (max-width: 400px) {
  .asientos {
    grid-gap: 4px;
  }

  .asiento {
    padding: 3px;
  }
}

</style>
