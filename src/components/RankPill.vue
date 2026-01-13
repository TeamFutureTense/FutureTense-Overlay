<script setup>
import { useTosuStore } from '@/stores/tosu';
import { computed } from 'vue';

const tosu = useTosuStore()

const currentStatus = computed(() => {
    let color = "#FFAEAE"
    if (tosu.beatmapStatus == "ranked" || tosu.beatmapStatus == "approved") {
        color = "#AEFFB2"
    }
    else if (tosu.beatmapStatus == "qualified") {
        color = "#AEDDFF"
    }
    else if (tosu.beatmapStatus == "loved") {
        color = "#FFAEE7"
    }
    else if (tosu.beatmapStatus == "graveyard") {
        color = "#B2AEFF"
    }

    return {text: tosu.beatmapStatus, color: color}
})
</script>
<template>
    <div class="rank-pill-container">
        <img v-if="tosu.beatmapStatus == 'ranked'" src="@/assets/icons/arrow-up-double-fill.svg"/>
        <img v-else-if="tosu.beatmapStatus == 'qualified'" src="@/assets/icons/award-fill.svg"/>
        <img v-else-if="tosu.beatmapStatus == 'loved'" src="@/assets/icons/heart-3-fill.svg"/>
        <img v-else-if="tosu.beatmapStatus == 'graveyard'" src="@/assets/icons/skull-2-fill.svg"/>
        <img v-else src="@/assets/icons/question-fill.svg"/>
    </div>
</template>
<style lang="css" scoped>
.rank-pill-container {
    height: 30px;
    border-radius: 20px;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 10px;
    gap: 5px;

    background-color: v-bind("currentStatus.color");
}
</style>