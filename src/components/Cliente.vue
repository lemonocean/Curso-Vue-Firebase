<template>
  <div class="seccion">
    <div class="atributo">
      <span>{{ nombres }} {{ apellidos }}</span>
    </div>
    <div class="atributo">
      <span>Edad: {{ edad }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombres: 'Isaac',
      apellidos: 'Newton',
      edad: 24
    }
  }
}
</script>


<style scoped>

.seccion {
  font-size: 2.4rem;
  color: #202020;
  background-color: #e9e9e9;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
}

.atributo {
  margin: 10px;
}

</style>
