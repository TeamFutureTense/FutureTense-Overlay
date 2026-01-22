<script setup>
import { computed, onMounted, watch } from 'vue';
import Circle from './Circle.vue';
import { useTosuStore } from '@/stores/tosu';

import { animate } from 'animejs';

const tosu = useTosuStore()

const showCounter = computed(() => {
    if (tosu.isInGame) {
        return true
    }
    else {
        return false
    }
})
const showSubCounter = computed(() => {
    if (tosu.isInGame && tosu.isBreak) {
        return true
    }
    else {
        return false
    }
})

const props = defineProps({
    top: {
        type: Number,
    },
    left: {
        type: Number
    },
})

// position values
const top = computed(()=> {
    return props.top + "px"
})

const left = computed(()=> {
    return props.left + "px"
})

// animation
function hideSubCountersAnimation() {

    const els = document.querySelectorAll('.sub-counters');

    animate(els, {
        scale: [1, 0],
        duration: 450,
        ease: "outQuad",
        onComplete: ()=> {
            animate(els, {
                width: el => [`${el.scrollWidth}px`, '0px'], // ← 关键：实时目标宽度
                duration: 500,
                ease: "outBack(1.7)"
            })
        }
    })
}

function showSubCountersAnimation() {

    const els = document.querySelectorAll('.sub-counters');

    // 先把它们设到可测量状态（width=0 也可测 scrollWidth）
    els.forEach(el => {
        el.style.display = 'inline-block';
        el.style.whiteSpace = 'nowrap';
        el.style.overflow = 'hidden';
    });

    animate(els, {
        width: el => ['0px', `${el.scrollWidth}px`], // ← 关键：实时目标宽度
        duration: 500,
        ease: "outBack(1.7)",
        onComplete: ()=> {
            animate(".sub-counters", {
                scale: [0, 1],
                duration: 450,
                ease: "outBack(1.7)"
            })
        }
    })
}

function hideCounterAnimation() {
    animate(".combo-counter-container", {
        opacity: [1, 0],
        duration: 400,
        ease: "outBack(1.7)",
    })
}

function showCounterAnimation() {
    animate(".combo-counter-container", {
        opacity: [0, 1],
        duration: 400,
        ease: "outBack(1.7)",
    })
}

function comboFlashAnimation() {

    console.log("Flash!")

    animate('#combo-number', {
        color: [
            'rgb(240,240,240)', // 平时
            'rgb(255,255,255)', // 亮一下
            'rgb(240,240,240)'  // 回去
        ],
        duration: 260,
        ease: "outQuad",
    })
}

// Watchers for triggering show/hide animations according to states
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

watch(showSubCounter, (newVal, oldVal) => {
    // show counter
    if (oldVal == false && newVal == true) {
        showSubCountersAnimation()
    }
    
    // hide counter
    else if (oldVal == true && newVal == false) {
        hideSubCountersAnimation()
    }
})

watch(()=>tosu.combo, (newVal, oldVal) => {
    comboFlashAnimation()
})

onMounted(()=>{

    console.log("Processed")
    if (showCounter.value == false) {
        hideCounterAnimation()
    }
    if (showSubCounter.value == false) {
        hideSubCountersAnimation()
    }
    
})

</script>
<template>
    <div class="combo-counter-container">
        <div class="combo-numbers">
            <div id="combo-text">
                Combo
            </div>
            <div id="combo-number">
                x{{ tosu.combo }}
            </div>
        </div>
        <div class="sub-status">
            <Circle color="#AEDDFF"/>
            <div style="font-size: 18; font-weight: bold; color: #AEDDFF;" class="sub-counters">{{ tosu.osu_h300 }}</div>

            <Circle v-show="tosu.osu_h100 !== 0" color="#AEFFB2"/>
            <div v-show="tosu.osu_h100 !== 0" style="font-size: 18; font-weight: bold; color: #AEFFB2;" class="sub-counters">{{ tosu.osu_h100 }}</div>

            <Circle v-show="tosu.osu_h50 !== 0" color="#FFFEAE"/>
            <div v-show="tosu.osu_h50 !== 0" style="font-size: 18; font-weight: bold; color: #FFFEAE;" class="sub-counters">{{ tosu.osu_h50 }}</div>
            
            <Circle v-show="tosu.osu_miss !== 0" color="#FFAEAE"/>
            <div v-show="tosu.osu_miss !== 0" style="font-size: 18; font-weight: bold; color: #FFAEAE;" class="sub-counters">{{ tosu.osu_miss }}</div>
        </div>
    </div>
</template>
<style scoped>
.combo-counter-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;

    position: absolute;
    top: v-bind(top);
    left: v-bind(left);
}
.combo-numbers {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 0px;
    gap: 5px;
}
#combo-text {
    font-family: 'Octarine';
    font-size: 18px;
    font-weight: bold;
    color: rgba(255, 255, 255, 0.75);
}
#combo-number {
    font-family: 'Octarine';
    font-size: 48px;
    font-weight: bold;
    color: rgb(220,220,220);
}
.sub-status {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 10px 0px 0px;
    gap: 10px;
}
.sub-counters {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
}
</style>