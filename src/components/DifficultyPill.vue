<script setup>
import { useTosuStore } from '@/stores/tosu';
import { computed } from 'vue';

const tosu = useTosuStore()

const currDiff = computed(() => {
    if (tosu.beatmapDiff === "") {
        return "0.00"
    }
    else {
        return tosu.beatmapDiff.toFixed(2)
    }
})

const currDiffname = computed(() => {
    if (tosu.beatmapDiffName === "") {
        return "Unknown Difficulty"
    }
    else {
        return tosu.beatmapDiffName
    }
})

function osuDifficultyColor(starRating) {
    const domain = [0.1, 1.25, 2, 2.5, 3.3, 4.2, 4.9, 5.8, 6.7, 7.7, 9];
    const range = ['#4290FB', '#4FC0FF', '#4FFFD5', '#7CFF4F', '#F6F05C', '#FF8068', '#FF4E6F', '#C645B8', '#6563DE', '#18158E', '#000000'];
    const gamma = 2.2;

    const rating = Number(starRating);
    if (!Number.isFinite(rating)) return '#AAAAAA';
    if (rating < 0.1) return '#AAAAAA';
    if (rating >= 9) return '#000000';

    const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

    const hexToRgb = (hex) => {
        const h = hex.replace('#', '').trim();
        const v = h.length === 3
        ? h.split('').map((c) => c + c).join('')
        : h;
        const n = parseInt(v, 16);
        return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
    };

    const rgbToHex = ({ r, g, b }) => {
        const to2 = (n) => clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0');
        return `#${to2(r)}${to2(g)}${to2(b)}`.toUpperCase();
    };

    const lerpGammaRgb = (a, b, t) => {
        const toLin = (c) => Math.pow(c / 255, gamma);
        const toSrgb = (cLin) => 255 * Math.pow(cLin, 1 / gamma);

        const ar = toLin(a.r), ag = toLin(a.g), ab = toLin(a.b);
        const br = toLin(b.r), bg = toLin(b.g), bb = toLin(b.b);

        return {
        r: toSrgb(ar + (br - ar) * t),
        g: toSrgb(ag + (bg - ag) * t),
        b: toSrgb(ab + (bb - ab) * t),
        };
    };

    // find segment
    let i = 0;
    while (i < domain.length - 1 && rating > domain[i + 1]) i++;

    const x0 = domain[i], x1 = domain[i + 1];
    const t = (rating - x0) / (x1 - x0);

    const c0 = hexToRgb(range[i]);
    const c1 = hexToRgb(range[i + 1]);

    return rgbToHex(lerpGammaRgb(c0, c1, t));
}

function hexToHSL(hex) {
    // Convert hex to RGB
    const h = hex.replace('#', '').trim();
    const n = parseInt(h, 16);
    let r = ((n >> 16) & 255) / 255;
    let g = ((n >> 8) & 255) / 255;
    let b = (n & 255) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h_val = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max) {
            case r: h_val = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h_val = ((b - r) / d + 2) / 6; break;
            case b: h_val = ((r - g) / d + 4) / 6; break;
        }
    }

    return { h: h_val * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;

    let r, g, b;

    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;

        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (x) => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

const majorColor = computed(() => {
    if (tosu.beatmapDiff === 0) {
        return "#808080"
    }
    else {
        return osuDifficultyColor(tosu.beatmapDiff)
    }
})

const minorColor = computed(() => {
    const hsl = hexToHSL(majorColor.value);
    return hslToHex(hsl.h, 21, 16);
})
</script>
<template>
    <div class="diff-panel-container">
        <div class="diff-display-container">
            <b>{{ currDiff }}</b>
        </div>
        <div class="diff-name-container">
            <TextCarousal :max-width="350" :gap="100" :speed="5" :delay="5">
                {{ currDiffname }}
            </TextCarousal>
        </div>
    </div>
</template>
<style scoped>
.diff-panel-container {
    height: 30px;

    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 10px 0px 0px;
    gap: -30px;
}
.diff-display-container {
    height: 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 0px 12px;
    gap: 5px;
    align-self: stretch;
    z-index: 2;
    background-color: v-bind(majorColor);
    color: black;
}
.diff-name-container {
    height: 30px;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px 10px 0px 40px;
    gap: 10px;
    align-self: stretch;
    margin: 0px -30px;
    z-index: 1;
    background-color: v-bind(minorColor);
    color: v-bind(majorColor);
}
</style>