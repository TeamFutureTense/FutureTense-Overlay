<script setup lang="js">
import ComboCounter from './components/ComboCounter.vue';

</script>

<template>
  <div class="overlay-container">
    <ComboCounter></ComboCounter>
  </div>
</template>

<style scoped>
.overlay-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 1080px;
}
</style>

<style>
  html {
    margin: 0;
    padding: 0;
  }

  body {
    margin: 0;
    padding: 0;
  }
</style>