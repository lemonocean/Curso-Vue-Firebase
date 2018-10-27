<template>
  <div class="entrada">
    <span>Entrada</span>
    <cliente />
    <div class="seccion">
      <span>Sección</span>
    </div>
  </div>  
</template>

<script>
import Cliente from '@/components/Cliente.vue'

export default {
  components: { Cliente }
}
</script>

<style>

.entrada {
  margin: 10px;
  padding: 10px;
  background-color: #553f75;
  font-size: 2.6rem;
}

.seccion {
  font-size: 2.4rem;
  color: #202020;
  background-color: #fae25c;
  border-radius: 5px;
  margin: 10px;
  padding: 10px;
}

</style>
