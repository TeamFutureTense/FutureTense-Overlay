<script setup>
import { computed, ref, watch } from 'vue';
import SmallRankDisplay from './SmallRankDisplay.vue';
import { useTosuStore } from '@/stores/tosu';

const tosu = useTosuStore()

const displayAcc = computed(() => {
    return tosu.currentAcc.toFixed(2)
})

// animated score
const animatedScore = ref(0);

// format score with commas
const formattedScore = computed(() => {
    return animatedScore.value.toLocaleString('en-US')
})

// animation status
let rafId = null;
let startTime = 0;
let startVal = 0;
let endVal = 0;

const DURATION = 220; 

function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
}

function tick(time) {
    if (!startTime) startTime = time;

    const progress = Math.min((time - startTime) / DURATION, 1);
    const eased = easeOutCubic(progress);

    animatedScore.value = Math.round(
        startVal + (endVal - startVal) * eased
    );

    if (progress < 1) {
        rafId = requestAnimationFrame(tick);
    }
}

// initialization animated score
animatedScore.value = tosu.currentScore ?? 0;

// counting up scores
watch(
    () => tosu.currentScore,
    (newScore) => {
        cancelAnimationFrame(rafId);

        startVal = animatedScore.value;
        endVal = Number(newScore) || 0;
        startTime = 0;

        rafId = requestAnimationFrame(tick);
    }
);


</script>
<template>
    <div class="score-counter-container">
        <div id="score-title">Score</div>
        <div id="score-count">{{ formattedScore }}</div>
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