<script setup>
import Circle from './Circle.vue';


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
            <div style="font-size: 18; font-weight: bold; color: #AEDDFF;">80</div>
            <Circle color="#AEFFB2"/>
            <div style="font-size: 18; font-weight: bold; color: #AEFFB2;">80</div>
            <Circle color="#FFFEAE"/>
            <div style="font-size: 18; font-weight: bold; color: #FFFEAE;">80</div>
            <Circle color="#FFAEAE"/>
            <div style="font-size: 18; font-weight: bold; color: #FFAEAE;">80</div>
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
</style>