<script setup lang="js">
import { onBeforeUnmount, computed, watch } from 'vue';
import ComboCounter from './components/ComboCounter.vue';
import ScoreCounter from './components/ScoreCounter.vue';
import { useTosuStore } from './stores/tosu';
import MetadataDisplay from './components/MetadataDisplay.vue';
import { useTosuPreciseStore } from './stores/tosuPrecise';
import HPBar from './components/HPBar.vue';

const tosu = useTosuStore()
const tosuPrecise = useTosuPreciseStore()

// 立即连接 WebSocket，不等待 onMounted
tosu.connect("127.0.0.1:24050", "v2", [
  "state", 
  "folders", 
  "files", 
  "resultsScreen", 
  "beatmap", 
  "play", 
  "settings", 
  "directPath"
])

tosuPrecise.connect("127.0.0.1:24050")

// 检查是否准备就绪
const isReady = computed(() => tosu.initialized && tosu.connected)

// 调试：监听状态变化
watch(() => [tosu.initialized, tosu.connected, isReady.value], ([init, conn, ready]) => {
  console.log('App.vue status:', { initialized: init, connected: conn, isReady: ready })
}, { immediate: true })

// End connection safely before unmounted
onBeforeUnmount(() => {
  tosu.disconnect()
})

</script>

<template>
  <!-- 连接中提示 -->
  <div v-show="!isReady" class="loading-screen">
    <div class="loading-content">
      <div class="loading-spinner"></div>
      <p class="loading-text">Connecting to tosu...</p>
      <p class="loading-hint">Make sure tosu is running on port 24050</p>
    </div>
  </div>

  <!-- 主界面 -->
  <div v-show="isReady" class="overlay-container">
    <ComboCounter 
    :left="20"
    :top="957"></ComboCounter>
    <ScoreCounter :top="15" :right="10"/>
    <MetadataDisplay/>
    <HPBar/>
  </div>
</template>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #00000000;
  font-family: 'Octarine', sans-serif;
}

.loading-content {
  text-align: center;
  padding: 40px;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  margin: 0 auto 20px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top: 4px solid #FF6B9D;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.loading-text {
  margin: 10px 0;
  font-size: 24px;
  font-weight: bold;
  color: white;
}

.loading-hint {
  font-size: 14px;
  color: #9e9e9e;
  margin-top: 10px;
}

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