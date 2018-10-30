<template>
  <div class="seccion">
    <div class="atributo">
      <input v-model="email" @keyup.enter="actualizarEmail" type="text">
    </div>
    <div class="atributo email">
      <span>
        Email: {{ emailEnviado }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      emailEnviado: ''
    }
  },
  methods: {
    actualizarEmail(event) {
      this.emailEnviado = this.email
    }
  }
}
</script>

<style>

.email {
  text-align: left;
}

</style>
