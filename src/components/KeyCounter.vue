<script setup>
import KeyCounterElement from './KeyCounterElement.vue';

</script>
<template>
    <div class="key-counters-container">
        <KeyCounterElement v-for="i in [1,2,3,4]"></KeyCounterElement>
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