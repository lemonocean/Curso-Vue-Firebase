<template>
  <div>
    <anuncio />
    <cliente />
    <boletos />
  </div>  
</template>

<script>
import Cliente from '@/components/Cliente.vue'
import Anuncio from '@/components/Anuncio.vue'
import Boletos from '@/components/Boletos.vue'

export default {
  components: { Cliente, Anuncio, Boletos }
}
</script>

<style>

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
