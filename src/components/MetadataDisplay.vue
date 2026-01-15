<script setup>
import { computed } from 'vue';
import DifficultyPill from './DifficultyPill.vue';
import RankPill from './RankPill.vue';
import TextCarousal from './TextCarousal.vue';

import { useTosuStore } from '@/stores/tosu';

const tosu = useTosuStore()

function msToMMSS(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const currSongTitle = computed(() => {
    console.log(tosu.beatmapTitle)
    return tosu.beatmapTitle === "" ? "Currently Not Playing!" : tosu.beatmapTitle
})

const currArtist = computed(() => {
    return tosu.beatmapArtist === "" ? "Unknown Artist" : tosu.beatmapArtist
})

const currMapper = computed(() => {
    return tosu.beatmapMapper === "" ? "Unknown Mapper" : tosu.beatmapMapper
})

const currDuration = computed(() => {
    return msToMMSS(tosu.beatmapCurrDuration)
})

const totalDuration = computed(() => {
    return msToMMSS(tosu.beatmapDuration)
})


</script>
<template>
    <div class="metadata-container">
        <div id="container-title">Now Playing</div>
        <div class="metadata-row-container">
            <div class="cover"></div>
            <div class="info-panel">
                <div id="song-title">
                    <TextCarousal :max-width="350" :gap="100" :speed="5" :delay="5">
                        {{ currSongTitle }}
                    </TextCarousal>
                </div>
                <div id="artist-information">
                    <TextCarousal :max-width="400" :gap="100" :speed="5" :delay="5">
                        {{ currArtist }} // {{ currMapper }}
                    </TextCarousal>
                </div>
                <div class="difficulty-panel">
                    <DifficultyPill/>
                    <RankPill/>
                </div>
                <div style="margin-top: 5px;">
                    {{ currDuration }} / {{ totalDuration }}
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
.metadata-container {
    position: absolute;
    left: 10px;
    top: 10px;

    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 10px;
}
.metadata-row-container {
    display: flex;
    flex-direction: row;
    padding: 0px 10px 0px 0px;
    gap: 10px;
}
.cover {
    width: 100px;
    height: 100px;
    border-radius: 15px;

    display: flex;
    flex-direction: column;
    justify-content: centern;
    align-items: center;
    padding: 10px;
    gap: 10px;

    background-color: #7a7a7a;
}
.info-panel {
    display: flex;
    flex-direction: column;
    padding: 0px 10px 0px 0px;
    gap: 5px;
}
.difficulty-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 10px 0px 0px;
    gap: 25px;
}

#container-title {
    font-family: Octarine;
    font-size: 18px;
    font-weight: bold;
    line-height: normal;
    color: #9E9E9E;
}
#song-title {
    font-family: Octarine;
    font-size: 22px;
    font-weight: bold;
    line-height: normal;
}
#artist-information {
    font-family: Octarine;
    font-size: 18px;
    font-weight: bold;
    line-height: normal;
    color: #9E9E9E;
}
</style>