<template>
  <div class="seccion">
    <div v-if="!pago && boletos == 0" class="mensaje informacion">
      Selecciona al menos un boleto.
    </div>
    <div v-else-if="!pago && boletos > 0" class="mensaje advertencia">
      Recuerda completar tu compra.
    </div>
    <div v-else class="mensaje exito">
      ¡Bienvenido!
    </div>
    <div class="atributo">
      <span>Boletos</span>
    </div>
    <div class="atributo">
      <span class="boletos">{{ boletos }}</span>
    </div>
    <div class="atributo">
      <button @click="actualizarCantidad(1)">+</button>
      <button @click="actualizarCantidad(-1)">-</button>
    </div>
    <div v-if="!pago && boletos > 0" class="atributo">
      <button @click="pago = true">Pagar</button>
    </div>
    <div v-if="pago" class="atributo">
      <button @click="reiniciar">Reiniciar</button>
    </div>
    <div class="atributo">
      <span class="comision" :class="claseComision">${{ comision }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      boletos: 0,
      comision: 0,
      claseComision: 'neutro',
      pago: false
    }
  },
  methods: {
    actualizarCantidad(cantidad) {
      this.boletos += cantidad

      if(this.boletos > 10) {
        this.boletos = 10
      }
      else if(this.boletos < 0) {
        this.boletos = 0
      }
    },
    reiniciar() {
      this.pago = false
      this.boletos = 0
      this.comision = 0
    }
  },
  watch: {
    boletos(newValue, oldValue) {
      if(newValue > oldValue) {
        this.comision += 10
      }
      else {
        this.comision -= 15
      }

      if(this.comision < 0) {
        this.comision *= 0
      }
    },
    comision(newValue, oldValue) {
      if(this.comision == 0) {
        this.claseComision = 'neutro'
      }
      else if(newValue > oldValue) {
        this.claseComision = 'incremento'
      }
      else {
        this.claseComision = 'decremento'
      }
    }
  }
}
</script>

<style>

.boletos {
  font-size: 4rem;
  font-weight: bold;
}

.comision {
  font-size: 3.2rem;
}

.neutro {
  columns: #2a2a2a;
}

.incremento {
  color: #356409;
}

.decremento {
  color: #a81717;
}

.mensaje {
  border-radius: 5px;
  border-width: 4px;
  border-style: dashed;
  padding: 10px;
  font-size: 2.1rem;
  font-weight: bold;
}

.informacion {
  border-color: blue;
}

.advertencia {
  border-color: orange;
}

.exito {
  border-color: green;
}

</style>
