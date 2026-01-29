<script setup>
import { useTosuPreciseStore } from '@/stores/tosuPrecise';
import KeyCounterElement from './KeyCounterElement.vue';

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