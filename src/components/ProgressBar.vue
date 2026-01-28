<script setup>
import { computed } from 'vue';


const props = defineProps({
    progress: {
        type: Number,
        required: true
    },
    total: {
        type: String,
        required: true
    },
    current: {
        type: String,
        required: true
    }
})

const currProgress = computed(() => {
    return (props.progress * 100).toFixed(2) + "%"
})

</script>
<template>
    <div class="main-container">
        <div class="length-display" v-if="true">
            <div class="length-display-element">{{ props.current }}</div>
            <div class="length-display-element">{{ props.total }}</div>
        </div>
        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
    </div>
</template>
<style lang="css" scoped>
.main-container {
    display: flex;
    flex-direction: column;
    margin: 0px;
    margin-top: 5px;
    padding: 0px;
}
.length-display {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 350px;
    font-size: 10px;
}
.progress-bar-container {
    margin: 0px;
    margin-top: 2px;
    padding: 0px;
    width: 350px;
    min-width: 350px;
    max-width: 350px;
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

    transition: all 0.3s;
}
</style>