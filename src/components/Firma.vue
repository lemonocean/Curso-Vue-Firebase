<template>
  <canvas @mousemove="dibujar" @mousedown="dibujando = true" @mouseup="detener" ref="canFirma" class="firma" width="380" height="200"></canvas>
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
    this.ctx.strokeStyle = '#303030'
    this.ctx.lineWidth = 5
    this.ctx.lineCap = 'round'
  }
}
</script>


<style>

.firma {
  cursor: pointer;
  background-color: white;
  border-radius: 5px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.9);
}

</style>
