<script setup>
import { useTosuStore } from '@/stores/tosu';
import { computed, watch, onMounted } from 'vue';
import { animate } from 'animejs';


const tosu = useTosuStore()

const actualWidth = computed(() => {
    return (tosu.currentHP).toFixed(2) + "%"
})

const showHPBar = computed(() => {
    return tosu.isInGame === true;
})

function hideHPBarAnimation() {
    animate(".hp-bar", {
        opacity: [1, 0],
        duration: 400,
        easing: "easeOutQuart",
    })
}

function showHPBarAnimation() {
    animate(".hp-bar", {
        opacity: [0, 1],
        duration: 400,
        easing: "easeOutQuart",
    })
}

watch(showHPBar, (newVal, oldVal) => {
    // show counter
    if (oldVal === false && newVal === true) {
        showHPBarAnimation()
    }
    
    // hide counter
    else if (oldVal === true && newVal === false) {
        hideHPBarAnimation()
    }
})

onMounted(() => {
    
    if (showHPBar.value === false) {
        hideHPBarAnimation()
    }
})

</script>
<template>
    <div class="hp-bar">

    </div>
</template>
<style lang="css" scoped>
.hp-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: v-bind("actualWidth");
    height: 7px;
    background-color: white;
    transition: width 0.2s ease-out;
}
</style>