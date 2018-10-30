<template>
  <div class="raiz">
    <canvas
    ref="canFirma" class="firma" width="380" height="200"></canvas>
    <div class="borde" 
      @mousemove="dibujar"
      @mousedown.left="iniciarDibujo"
      @mousedown.right="iniciarBorrado"
      @mouseup="detener"
      @contextmenu.prevent
    ></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      x0: -1,
      y0: -1,
      dibujando: false
    }
  },
  methods: {
    iniciarDibujo() {
      this.ctx.strokeStyle = '#303030'
      this.ctx.lineWidth = 5
      this.dibujando = true
    },
    iniciarBorrado() {
      this.ctx.strokeStyle = '#fff'
      this.ctx.lineWidth = 20
      this.dibujando = true
    },
    detener() {
      this.dibujando = false
      this.x0 = -1
      this.y0 = -1
    },
    dibujar(event) {
      if(!this.dibujando) { return }

      if(this.x0 == -1 || this.y0 == -1) {
        this.x0 = event.offsetX
        this.y0 = event.offsetY
        return
      }

      const x1 = event.offsetX
      const y1 = event.offsetY

      this.ctx.beginPath()
      this.ctx.moveTo(this.x0, this.y0)
      this.ctx.lineTo(x1, y1)
      this.ctx.stroke()

      this.x0 = x1
      this.y0 = y1
    }
  },
  mounted() {
    this.ctx = this.$refs.canFirma.getContext('2d')    
    this.ctx.lineCap = 'round'
  }
}
</script>


<style>

.raiz {
  display: grid;
  margin: 10px;
}

.borde {
  cursor: pointer;
  border-radius: 5px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.9);
  width: 380px;
  height: 200px;

  grid-row: 1;
  grid-column: 1;
  z-index: 3;
}

.firma {
  cursor: pointer;
  background-color: white;
  border-radius: 5px;

  grid-row: 1;
  grid-column: 1;
  z-index: 2;
}

</style>
