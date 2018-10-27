<template>
  <div id="app" class="principal">
    <span>{{ titulo }}</span>
    <entrada />
  </div>
</template>

<script>
import Entrada from '@/views/Entrada.vue'

export default {
  components: { Entrada },
  name: 'App',
  data() {
    return {
      titulo: 'Entradas'
    }
  }
}
</script>

<style>

html {
  font-size: 62.5% !important; /* 10px / 16px = 0.625 */
}

.principal {
  background-color: #a21010;
  padding: 10px;
  color: white;
  border-radius: 5px;
  width: 400px;
  font-size: 3rem;
  text-align: center;
}

</style>
