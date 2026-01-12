<script setup>

import { useTosuStore } from '@/stores/tosu';
import { computed } from 'vue';

const tosu = useTosuStore()

const RankInfo = computed(() => {
    if (tosu.rankCurrent === "XH") {
        return {text: "SS", color: "#D6D3D1"}
    }
    else if (tosu.rankCurrent === "X") {
        return {text: "SS", color: "#FFEDB3"}
    }
    else if (tosu.rankCurrent === "SH") {
        return {text: "S", color: "#D6D3D1"}
    }
    else if (tosu.rankCurrent === "S") {
        return {text: "S", color: "#AEDDFF"}
    }
    else if (tosu.rankCurrent === "A") {
        return {text: "A", color: "#AEFFB2"}
    }
    else if (tosu.rankCurrent === "B") {
        return {text: "B", color: "#FFFEAE"}
    }
    else if (tosu.rankCurrent === "C") {
        return {text: "C", color: "#FFCDAE"}
    }
    else if (tosu.rankCurrent === "D") {
        return {text: "D", color: "#FFAEAE"}
    }
    else if (tosu.rankCurrent === "F") {
        return {text: "F", color: "#FFAEAE"}
    }
})

</script>
<template>
    <div class="small-rank-display-container">
        {{ RankInfo.text }}
    </div>
</template>
<style scoped>
.small-rank-display-container {
    border-radius: 15px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 3px 12px;
    margin: 0px;
    gap: 10px;

    background-color: #2a2a2a;
    border: 2px solid v-bind("RankInfo.color");
    color: v-bind("RankInfo.color");
    font-family: 'Montserrat';
    font-size: 18px;
    font-weight: bold;
}
</style>