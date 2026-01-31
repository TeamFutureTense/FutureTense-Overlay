<script setup>
import { computed, watch, onMounted } from 'vue';
import { animate } from 'animejs';
import DifficultyPill from './DifficultyPill.vue';
import RankPill from './RankPill.vue';
import TextCarousal from './TextCarousal.vue';

import { useTosuStore } from '@/stores/tosu';
import ProgressBar from './ProgressBar.vue';

const tosu = useTosuStore()

function msToMMSS(ms) {
    if (!ms || ms <= 0) return "0:00";
    
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

const currSongTitle = computed(() => {
    const title = tosu.beatmapTitle || "";
    return title === "" ? "Currently Not Playing!" : title;
})

const currArtist = computed(() => {
    const artist = tosu.beatmapArtist || "";
    return artist === "" ? "Unknown Artist" : artist;
})

const currMapper = computed(() => {
    const mapper = tosu.beatmapMapper || "";
    return mapper === "" ? "Unknown Mapper" : mapper;
})

const currDuration = computed(() => {
    return msToMMSS(tosu.beatmapCurrDuration);
})

const totalDuration = computed(() => {
    return msToMMSS(tosu.beatmapDuration);
})

const backgroundUrl = computed(() => {
    const url = tosu.beatmapBg || '';
    return url ? `url('${url}')` : 'none';
})

const showMetadata = computed(() => {
    return tosu.isInGame === true;
})

function hideMetadataAnimation() {
    animate(".metadata-container", {
        opacity: [1, 0],
        duration: 400,
        easing: "easeOutQuart",
    })
}

function showMetadataAnimation() {
    animate(".metadata-container", {
        opacity: [0, 1],
        duration: 400,
        easing: "easeOutQuart",
    })
}

watch(showMetadata, (newVal, oldVal) => {
    // show counter
    if (oldVal === false && newVal === true) {
        showMetadataAnimation()
    }
    
    // hide counter
    else if (oldVal === true && newVal === false) {
        hideMetadataAnimation()
    }
})

onMounted(() => {
    
    if (showMetadata.value === false) {
        hideMetadataAnimation()
    }
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
                <ProgressBar :current="currDuration" :total="totalDuration" :progress="tosu.beatmapCurrDuration / tosu.beatmapDuration"/>
            </div>
        </div>
    </div>
</template>
<style lang="css" scoped>
.metadata-container {
    position: absolute;
    left: 10px;
    top: 15px;

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
    background-image: v-bind(backgroundUrl);
    background-size: cover;
    background-position: center;
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
.duration-display {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
}
.duration-display > div {
    min-width: 40px;
}

#container-title {
    font-family: Octarine;
    font-size: 18px;
    font-weight: bold;
    line-height: normal;
    color: rgba(255, 255, 255, 0.75);
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
    color: rgba(255, 255, 255, 0.75);
}
</style>