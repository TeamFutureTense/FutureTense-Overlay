<script setup>
import { useTosuStore } from '@/stores/tosu';
import { computed } from 'vue';


const tosu = useTosuStore()

const actualWidth = computed(() => {
    return (tosu.currentHP).toFixed(2) + "%"
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