<template>
  <div>
    <div class="seccion">
      <transition name="scale-y" mode="out-in">
        <div v-if="!pago && boletos == 0" :key="1" class="mensaje informacion">
          Selecciona al menos un boleto.
        </div>
        <div v-else-if="!pago && boletos > 0" :key="2" class="mensaje advertencia">
          Recuerda completar tu compra.
        </div>
        <div v-else :key="3" class="mensaje exito">
          ¡Bienvenido!
        </div>
      </transition>
      <div class="atributo">
        <span>Asientos</span>
      </div>
      <div class="atributo">
        <transition-group name="superior">
          <button @click="seleccionar(asiento, index)" v-for="(asiento, index) in asientos" :key="asiento">{{ asiento }}</button>
        </transition-group>
      </div>
    </div>
    <div class="seccion">
      <div class="atributo">
        <span>Boletos</span>
      </div>
      <div class="atributo">
        <span class="boletos">{{ boletos }}</span>
      </div>
      <div v-show="boletos > 0" class="atributo">
        <span>Total: ${{ total }}</span>
      </div>
      <div class="atributo">
        <transition-group name="inferior">
          <button class="seleccion" @click="remover(asiento, index)" v-for="(asiento, index) in seleccionados" :key="asiento">{{ asiento }}</button>
        </transition-group>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      comision: 0,
      claseComision: 'neutro',
      pago: false,
      asientos: [
        'A1', 'A2', 'A3', 'A4', 'A5',
        'B1', 'B2', 'B3', 'B4', 'B5'
      ],
      seleccionados: []
    }
  },
  computed: {
    boletos() {
      return this.seleccionados.length
    },
    total() {
      return this.boletos * 100
    }
  },
  methods: {
    seleccionar(asiento, index) {
      this.asientos.splice(index, 1)
      this.seleccionados.push(asiento)
      this.seleccionados.sort()
    },
    remover(asiento, index) {
      this.seleccionados.splice(index, 1)
      this.asientos.push(asiento)
      this.asientos.sort()
    },
    reiniciar() {
      this.pago = false
      this.asientos.push(...this.seleccionados)
      this.asientos.sort()
      this.seleccionados = []
      this.comision = 0
    }
  },
  watch: {
    boletos(newValue, oldValue) {
      if (newValue > oldValue) {
        this.comision += 10
      }
      else {
        this.comision -= 15
      }

      if (this.comision < 0) {
        this.comision *= 0
      }
    },
    comision(newValue, oldValue) {
      if (this.comision == 0) {
        this.claseComision = 'neutro'
      }
      else if (newValue > oldValue) {
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

.seleccion {
  background-color: #80d80e;
}

.scale-y-enter {
  opacity: 0;
}

.scale-y-enter-active {
  transition: opacity 0.3s ease-out;
  animation: mensaje-in 0.3s ease-out forwards;
}

.scale-y-leave-active {
  transition: opacity 0.2s ease-out;
  animation: mensaje-out 0.2s ease-out forwards;
  opacity: 0;
}

@keyframes mensaje-in {
  0% {
    transform: scaleY(0);
  }
  70% {
    transform: scaleY(1.2);
  }
  90% {
    transform: scaleY(0.9);
  }
  100% {
    transform: scaleY(1);
  }
}

@keyframes mensaje-out {
  from {
    transform: scaleY(1);
  }
  to {
    transform: scaleY(0);
  }
}

.superior-enter {
  opacity: 0;
}

.superior-enter-active {
  transition: opacity 0.3s ease-out;
  animation: superior-in 0.3s ease-out forwards;
}

.superior-leave-active {
  transition: opacity 0.2s ease-out;
  animation: superior-out 0.2s ease-out forwards;
  opacity: 0;
}

@keyframes superior-in {
  0% {
    transform: translateY(30px);
  }
  70% {
    transform: translateY(-10px);
  }
  90% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes superior-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(30px);
  }
}

.inferior-enter {
  opacity: 0;
}

.inferior-enter-active {
  transition: opacity 0.3s ease-out;
  animation: inferior-in 0.3s ease-out forwards;
}

.inferior-leave-active {
  transition: opacity 0.2s ease-out;
  animation: inferior-out 0.2s ease-out forwards;
  opacity: 0;
}

@keyframes inferior-in {
  0% {
    transform: translateY(-30px);
  }
  70% {
    transform: translateY(10px);
  }
  90% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes inferior-out {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-30px);
  }
}

</style>
