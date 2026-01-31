<script setup>
import { computed, ref, watch, onMounted } from 'vue';
import SmallRankDisplay from './SmallRankDisplay.vue';
import { useTosuStore } from '@/stores/tosu';
import { animate } from 'animejs';

const props = defineProps({
    top: {
        type: Number,
    },
    right: {
        type: Number
    },
})

const top = computed(()=> {
    return props.top + "px"
})

const right = computed(()=> {
    return props.right + "px"
})

const tosu = useTosuStore()

const displayAcc = computed(() => {
    return tosu.currentAcc.toFixed(2)
})

const displayPP = computed(() => {
    if (tosu.isInGame) {
        if (tosu.isBreak) {
            return tosu.currentPP
        }
        else {
            return "--"
        }
    }
    else {
        return "--"
    }
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

// Hide and show animations
function hideCounterAnimation() {
    animate(".score-counter-container", {
        opacity: [1, 0],
        duration: 400,
        ease: "outBack(1.7)",
    })
}

function showCounterAnimation() {
    animate(".score-counter-container", {
        opacity: [0, 1],
        duration: 400,
        ease: "outBack(1.7)",
    })
}

// Watchers for triggering show/hide animations according to states
const showCounter = computed(() => {
    if (tosu.isInGame) {
        return true
    }
    else {
        return false
    }
})

watch(showCounter, (newVal, oldVal) => {
    // show counter
    if (oldVal == false && newVal == true) {
        showCounterAnimation()
    }
    
    // hide counter
    else if (oldVal == true && newVal == false) {
        hideCounterAnimation()
    }
})

// icon show / hide logic
function hideIconsAnimation() {

    const els = document.querySelectorAll('.icons');

    animate(els, {
        scale: [1, 0],
        duration: 450,
        ease: "outQuad",
        onComplete: ()=> {
            animate(els, {
                width: el => [`${el.scrollWidth}px`, '0px'],
                duration: 500,
                ease: "outBack(1.7)",
                onComplete: ()=> {
                    // 动画完成后彻底隐藏元素
                    els.forEach(el => {
                        el.style.display = 'none';
                    });
                }
            })
        }
    })
}

function showIconsAnimation() {

    const els = document.querySelectorAll('.icons');

    // 先显示元素并设置为可测量状态
    els.forEach(el => {
        el.style.display = 'inline-block';
        el.style.whiteSpace = 'nowrap';
        el.style.overflow = 'hidden';
        el.style.width = '0px';
    });

    animate(els, {
        width: el => ['0px', `${el.scrollWidth}px`],
        duration: 500,
        ease: "outBack(1.7)",
        onComplete: ()=> {
            animate(".icons", {
                scale: [0, 1],
                duration: 450,
                ease: "outBack(1.7)"
            })
        }
    })
}

const showIcons = computed(() => {
    const result = tosu.isInGame && tosu.isBreak
    return result
})

watch(showIcons, (newVal, oldVal) => {
    // show counter
    if (oldVal == false && newVal == true) {
        showIconsAnimation()
    }
    
    // hide counter
    else if (oldVal == true && newVal == false) {
        hideIconsAnimation()
    }
}, { immediate: true })

onMounted(()=>{

    if (showCounter.value == false) {
        hideCounterAnimation()
    }
    if (showIcons.value == false) {
        hideIconsAnimation()
    }
    
})

</script>
<template>
    <div class="score-counter-container">
        <div id="score-title">Score</div>
        <div id="score-count">{{ formattedScore }}</div>
        <div class="small-score-panel">
            <div class="icons">
                <img src="@/assets/icons/line-chart-fill.svg" height="24px"/>
            </div>
            <div id="acc-count">
                {{ displayPP }}pp
            </div>
            <div class="icons">
                <img src="@/assets/icons/focus-2-fill.svg" height="24px"/>
            </div>
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
    top: v-bind("top");
    right: v-bind("right");

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
    color: rgba(255, 255, 255, 0.75);
}

#score-count {
    font-size: 48px;
    font-weight: bold;
    color: #ffffff;
}

#acc-count {
    font-size: 18px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.75);
}
</style>