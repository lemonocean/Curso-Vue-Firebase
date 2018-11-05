<template>
  <v-layout column justify-center text-xs-center>
    <div class="home-titulo">
      <h1>Súper Ópera</h1>
    </div>
    <v-layout wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="item in 4" :key="item">
        <v-card class="elevation-5 ma-3">
          <v-img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Solid_white.svg/512px-Solid_white.svg.png"></v-img>
        </v-card>
      </v-flex>
    </v-layout>
  </v-layout>
</template>

<style>

.home-titulo {
  font-family: 'Great Vibes', cursive;
  font-size: 2rem;
  color: #553f75;
  text-shadow: 1px 1px 5px #acacac;
}

</style>
