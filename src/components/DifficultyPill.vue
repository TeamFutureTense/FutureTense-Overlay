<script setup>
import { useTosuStore } from '@/stores/tosu';
import { computed } from 'vue';

const tosu = useTosuStore()

const currDiff = computed(() => {
    if (tosu.beatmapDiff === "") {
        return "0.00"
    }
    else {
        return tosu.beatmapDiff.toFixed(2)
    }
})

const currDiffname = computed(() => {
    if (tosu.beatmapDiffName === "") {
        return "Unknown Difficulty"
    }
    else {
        return tosu.beatmapDiffName
    }
})
</script>
<template>
    <div class="diff-panel-container">
        <div class="diff-display-container">
            <b>0.00</b>
        </div>
        <div class="diff-name-container">
            <TextCarousal :max-width="350" :gap="100" :speed="5" :delay="5">
                Unknown Difficulty
            </TextCarousal>
        </div>
    </div>
</template>
<style scoped>
.diff-panel-container {
    height: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 10px 0px 0px;
    gap: -30px;
}
.diff-display-container {
    height: 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 12px;
    gap: 5px;
    align-self: stretch;
    z-index: 2;
    background-color: gray;
    color: black;
}
.diff-name-container {
    height: 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 10px 0px 40px;
    gap: 10px;
    align-self: stretch;
    margin: 0px -30px;
    z-index: 1;
    background-color: rgb(52, 52, 52);
    color: gray;
}
</style>