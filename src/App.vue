<script setup lang="js">
import { ref } from 'vue';
import ComboCounter from './components/ComboCounter.vue';

const showCounter = ref(true)
const showSubCounter = ref(true)

</script>

<template>
  <div class="overlay-container">
    <ComboCounter 
    v-model:showCounter="showCounter" 
    v-model:showSubCounter="showSubCounter"
    :left="20",
    :top="957"></ComboCounter>
  </div>
</template>

<style scoped>
.overlay-container {
  position: relative;
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