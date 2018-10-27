<template>
  <div id="app" class="principal">
    <span>App</span>
    <entrada />
    <cliente />
  </div>
</template>

<script>
import Entrada from '@/views/Entrada.vue'
import Cliente from '@/components/Cliente.vue'

export default {
  components: { Entrada, Cliente },
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
