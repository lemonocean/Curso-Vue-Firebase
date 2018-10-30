<template>
  <div class="seccion">
    <div class="atributo">
      <input v-model="email" @keyup.enter="actualizarEmail" type="text">
    </div>
  </div>
</template>

<script>
export default {
  props: ['emailRecibido'],
  data() {
    return {
      email: ''
    }
  },
  methods: {
    actualizarEmail(event) {
      this.$emit('onCambioEmail', this.email)
    }
  },
  created() {
    this.email = this.emailRecibido
  }
}
</script>

<style>

.email {
  text-align: left;
}

</style>
