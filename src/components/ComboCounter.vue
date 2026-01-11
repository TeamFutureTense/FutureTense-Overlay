<script setup>
import { onMounted } from 'vue';
import Circle from './Circle.vue';

import { animate } from 'animejs';

// animation
function hideSubCounters() {

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

function showSubCounters() {

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

function hideCounter() {
    animate(".combo-counter-container", {
        opacity: [1, 0],
        duration: 400,
        ease: "outBack(1.7)",
    })
}

function showCounter() {
    animate(".combo-counter-container", {
        opacity: [0, 1],
        duration: 400,
        ease: "outBack(1.7)",
    })
}

onMounted(()=>{
    
})

</script>
<template>
    <div class="combo-counter-container">
        <div class="combo-numbers">
            <div id="combo-text">
                Combo
            </div>
            <div id="combo-number">
                x100
            </div>
        </div>
        <div class="sub-status">
            <Circle color="#AEDDFF"/>
            <div style="font-size: 18; font-weight: bold; color: #AEDDFF;" class="sub-counters">80</div>
            <Circle color="#AEFFB2"/>
            <div style="font-size: 18; font-weight: bold; color: #AEFFB2;" class="sub-counters">80</div>
            <Circle color="#FFFEAE"/>
            <div style="font-size: 18; font-weight: bold; color: #FFFEAE;" class="sub-counters">80</div>
            <Circle color="#FFAEAE"/>
            <div style="font-size: 18; font-weight: bold; color: #FFAEAE;" class="sub-counters">80</div>
        </div>
    </div>
</template>
<style scoped>
.combo-counter-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 10px;
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
    color: #9e9e9e;
}
#combo-number {
    font-family: 'Octarine';
    font-size: 48px;
    font-weight: bold;
    color: #ffffff;
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