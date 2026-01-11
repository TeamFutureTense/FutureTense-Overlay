<script setup lang="js">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ComboCounter from './components/ComboCounter.vue';
import { useTosuStore } from './stores/tosu';

const tosu = useTosuStore()

// Build Connection when overlay is mounted
onMounted(() => {
  tosu.connect("127.0.0.1:24050", "v2", ["state", "folders", "files", "resultsScreen", "beatmap", "play", "settings"])
})

// End connection safely before unmounted
onBeforeUnmount(() => {
  tosu.disconnect()
})

</script>

<template>
  <div class="overlay-container">
    <ComboCounter 
    :left="20"
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