<script setup>
</script>
<template>
    <div class="key-counter-element">
        <div class="occupier"></div>
        <div class="key-count">
            0
        </div>
        <div class="edge"></div>
    </div>
</template>
<style lang="css" scoped>
.key-counter-element {
    width: 75px;
    height: 75px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0px;
    margin: 0px;
}
.occupier {
    width: 1px;
    height: 1px;
    background-color: #00000000;
}
.key-count {
    font-size: 20px;
    font-weight: bold;
    color: white;
}
.edge {
    width: 7px;
    height: 100%;
    background-color: #ffffff;
}
</style>