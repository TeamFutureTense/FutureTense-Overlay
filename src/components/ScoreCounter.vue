<script setup>
import { computed } from 'vue';
import SmallRankDisplay from './SmallRankDisplay.vue';

import { useTosuStore } from '@/stores/tosu';

const tosu = useTosuStore()

const displayAcc = computed(() => {
    return tosu.currentAcc.toFixed(2)
})  


</script>
<template>
    <div class="score-counter-container">
        <div id="score-title">Score</div>
        <div id="score-count">{{ tosu.currentScore }}</div>
        <div class="small-score-panel">
            <div id="acc-count">
                {{ displayAcc }}%
            </div>
            <SmallRankDisplay/>
        </div>
    </div>
</template>
<style scoped>
.score-counter-container {
    position: absolute;
    top: 25px;
    right: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 10px;
    gap: 5px;
}

.small-score-panel {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px 0px 0px 10px;
    gap: 10px;
}

#score-title {
    font-size: 18px;
    font-weight: bold;
    color: #9E9E9E;
}

#score-count {
    font-size: 48px;
    font-weight: bold;
    color: #ffffff;
}

#acc-count {
    font-size: 18px;
    font-weight: bold;
    color: #9E9E9E;
}
</style>