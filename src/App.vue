<script setup lang="js">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ComboCounter from './components/ComboCounter.vue';
import ScoreCounter from './components/ScoreCounter.vue';
import { useTosuStore } from './stores/tosu';
import TextCarousal from './components/TextCarousal.vue';
import MetadataDisplay from './components/MetadataDisplay.vue';

const tosu = useTosuStore()

// Build Connection when overlay is mounted
onMounted(() => {
  tosu.connect("127.0.0.1:24050", "v2", ["state", "folders", "files", "resultsScreen", "beatmap", "play", "settings", "directPath"])
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
    <ScoreCounter :top="25" :right="10"/>
    <MetadataDisplay/>
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