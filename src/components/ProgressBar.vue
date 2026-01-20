<script setup>
import { computed } from 'vue';


const props = defineProps({
    progress: {
        type: Number,
        required: true
    }
})

const currProgress = computed(() => {
    return (props.progress * 100).toFixed(2) + "%"
})

</script>
<template>
    <div class="progress-bar-container">
        <div class="progress-bar"></div>
    </div>
</template>
<style lang="css" scoped>
.progress-bar-container {
    margin: 0px;
    padding: 0px;
    width: 250px;
    min-width: 250px;
    max-width: 250px;
    height: 7px;
    border-radius: 7px;
    background-color: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(10px);
}
.progress-bar {
    margin: 0px;
    padding: 0px;
    width: v-bind("currProgress");
    height: 7px;
    border-radius: 7px;
    background-color: rgba(255, 255, 255, 1);

    position: relative;
    top: 0;
    left: 0;
}
</style>