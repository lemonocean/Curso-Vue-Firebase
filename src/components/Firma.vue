<template>
  <canvas ref="canFirma" class="firma" width="380" height="200"></canvas>
</template>

<script>
export default {
  data() {
    return {
      ctx: null
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
