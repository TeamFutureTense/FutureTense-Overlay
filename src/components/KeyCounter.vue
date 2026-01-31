<script setup>
import { useTosuPreciseStore } from '@/stores/tosuPrecise';
import { useTosuStore } from '@/stores/tosu';
import KeyCounterElement from './KeyCounterElement.vue';
import { computed, onMounted, watch } from 'vue';
import { animate } from 'animejs';

const tosu = useTosuStore()

const showKeyCounter = computed(() => {
    return tosu.isInGame === true;
})

function hideKeyCounterAnimation() {
    animate(".key-counters-container", {
        opacity: [1, 0],
        duration: 400,
        easing: "easeOutQuart",
    })
}

function showKeyCounterAnimation() {
    animate(".key-counters-container", {
        opacity: [0, 1],
        duration: 400,
        easing: "easeOutQuart",
    })
}

watch(showKeyCounter, (newVal, oldVal) => {
    // show counter
    if (oldVal === false && newVal === true) {
        showKeyCounterAnimation()
    }
    
    // hide counter
    else if (oldVal === true && newVal === false) {
        hideKeyCounterAnimation()
    }
})

onMounted(() => {
    if (showKeyCounter.value === false) {
        hideKeyCounterAnimation()
    }
})

const tosuPrecise = useTosuPreciseStore()

</script>
<template>
    <div class="key-counters-container">
        <KeyCounterElement :isPressed="tosuPrecise.keys.k1.isPressed" :count="tosuPrecise.keys.k1.count"/>
        <KeyCounterElement :isPressed="tosuPrecise.keys.k2.isPressed" :count="tosuPrecise.keys.k2.count"/>
        <KeyCounterElement :isPressed="tosuPrecise.keys.m1.isPressed" :count="tosuPrecise.keys.m1.count"/>
        <KeyCounterElement :isPressed="tosuPrecise.keys.m2.isPressed" :count="tosuPrecise.keys.m2.count"/>
    </div>
</template>
<style lang="css" scoped>
.key-counters-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    margin: 0px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}
</style>