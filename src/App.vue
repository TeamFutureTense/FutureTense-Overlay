<script setup lang="js">
import { ref } from 'vue';
import ComboCounter from './components/ComboCounter.vue';

const showCounter = ref(false)
const showSubCounter = ref(false)

</script>

<template>
  <div class="overlay-container">
    <ComboCounter v-model:showCounter="showCounter" v-model:showSubCounter="showSubCounter"></ComboCounter>
    <button @click="showCounter = !showCounter">Toggle Counter Visibility</button>
    <button @click="showSubCounter = !showSubCounter">Toggle SubCounter Visibility</button>
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