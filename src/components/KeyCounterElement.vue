<script setup>
import { computed } from 'vue';


const props = defineProps({
    isPressed: {
        type: Boolean,
        required: true,
        default: false
    },
    count: {
        type: Number,
        required: true,
        default:0
    }
})

const edgeColor = computed(() => {
    if (props.isPressed) {
        return "rgba(255,255,255,1)"
    }
    else {
        return "rgba(255,255,255,0.7)"
    }
})

const edgeHeight = computed(() => {
    if (props.isPressed) {
        return "100%"
    }
    else {
        return "75%"
    }
})

const backgroundColor = computed(() => {
    if (props.isPressed) {
        return "rgba(255,255,255,0.2)"
    }
    else {
        return "rgba(255,255,255,0)"
    }
})
</script>
<template>
    <div class="key-counter-element">
        <div class="occupier"></div>
        <div class="key-count">
            {{ props.count }}
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
    background-color: v-bind("backgroundColor");
    transition: all 0.1s;
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
    height: v-bind("edgeHeight");
    background-color: v-bind("edgeColor");
    transition: all 0.1s;
}
</style>