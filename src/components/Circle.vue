<script setup>

const props = defineProps(['color'])

</script>
<template>
    <svg width="10" height="10" viewBox="0 0 10 10">
        <circle cx="5" cy="5" r="5" :fill="props.color" />
    </svg>
</template>