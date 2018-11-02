<template>
  <div class="seccion">
    <div class="tiquete">
      <div class="obra">
        <slot name="obra" />
      </div>
      <div class="horario">
        <slot name="horario" />
      </div>
      <div class="asientos">
        <slot name="asientos" />
      </div>
      <div class="total">
        <slot name="total" />
      </div>
      <div class="atributo slogan">
        <span>Teatro Súper Ópera - Desde 1914</span>
      </div>
    </div>
  </div>
</template>

<style>

.tiquete {
  background-color: white;
  padding: 10px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.9);
}

.obra {
  font-size: 2.4rem;
  font-weight: bold;
  font-style: italic;
  padding: 5px;
}

.horario {
  font-size: 2.2rem;
  padding: 5px;
}

.asientos {
  font-weight: bold;
  margin: 20px;
}

.total {
  font-weight: bold;
  font-size: 2.4rem;
}

.slogan {
  font-weight: bold;
  font-size: 1.8rem;
}

</style>

