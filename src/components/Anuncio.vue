<template>
  <div class="anuncio">
    <span v-once>
      {{ presentaciones[indice] }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      presentaciones: [
        'Hamilton - 20:30',
        'Frozen - 15:00',
        'Anastasia - 14:00',
        'El Rey León - 22:00'
      ],
      indice: 0
    }
  },
  methods: {
    mostrarAnuncio() {
      this.indice++

      if(this.indice == this.presentaciones.length) {
        this.indice = 0
        this.$destroy()
      }
    }
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')    
  },
  beforeMount() {
    console.log('beforeMount')
  },
  mounted() {
    console.log('mounted')
    setInterval(this.mostrarAnuncio, 2000)
  },
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },
  beforeDestroy() {
    console.log('beforeDestroy')
  },
  destroyed() {
    console.log('destroyed')
  }
}
</script>

<style>
.anuncio {
  margin: 10px;
  font-size: 2rem;

  border-top-color: white;
  border-top-width: 1px;
  border-top-style: solid;

  border-bottom-color: white;
  border-bottom-width: 1px;
  border-bottom-style: solid;
}
</style>
