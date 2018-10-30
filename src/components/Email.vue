<template>
  <div class="seccion">
    <div class="atributo">
      <input @keyup.enter="actualizarEmail" type="text">
    </div>
    <div class="atributo email">
      <span>
        Email: {{ email }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: ''
    }
  },
  methods: {
    actualizarEmail(event) {
      this.email = event.target.value
    }
  }
}
</script>

<style>

.email {
  text-align: left;
}

</style>
