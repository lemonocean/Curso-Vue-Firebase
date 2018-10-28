<template>
  <div>
    <anuncio />
    <cliente />
  </div>  
</template>

<script>
import Cliente from '@/components/Cliente.vue'
import Anuncio from '@/components/Anuncio.vue'

export default {
  components: { Cliente, Anuncio }
}
</script>
