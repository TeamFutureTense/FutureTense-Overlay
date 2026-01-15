<template>
    <div
        ref="rootRef"
        class="marquee-root"
        :style="rootStyle"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <div class="marquee-viewport">
        <!-- track：滚动轨道 -->
        <div
            class="marquee-track"
            :class="{ 'is-animating': shouldAnimate, 'is-paused': pauseOnHover && hovered }"
            :style="trackStyle"
        >
            <!-- 第一份内容 -->
            <div ref="contentRef" class="marquee-content">
                <slot />
            </div>

            <!-- 第二份内容：用于无缝衔接 -->
            <div v-if="shouldAnimate" class="marquee-content marquee-clone" aria-hidden="true">
                <slot />
            </div>
        </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watchEffect } from "vue";

type Props = {
    /** 最大宽度：number 会自动加 px；不传则用容器实际宽度 */
    maxWidth?: number | string;
    /** 滚动速度（px/s） */
    speed?: number;
    /** 两份内容之间的间隔（px） */
    gap?: number;
    /** 开始滚动前延迟（s） */
    delay?: number;
    /** 超出多少才算需要滚动（避免刚好相等时抖动），px */
    threshold?: number;
    /** hover 时暂停 */
    pauseOnHover?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
    speed: 60,
    gap: 32,
    delay: 0,
    threshold: 1,
    pauseOnHover: true,
});

const rootRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

const hovered = ref(false);

const containerWidth = ref(0);
const contentWidth = ref(0);

let ro: ResizeObserver | null = null;

const normalizedMaxWidth = computed(() => {
    if (props.maxWidth == null) return null;
    return typeof props.maxWidth === "number" ? `${props.maxWidth}px` : props.maxWidth;
});

const effectiveWidth = computed(() => {
    // 如果传了 maxWidth，用它；否则用实际容器宽度
    if (normalizedMaxWidth.value) return null; // 用 CSS 控制外层宽度
    return containerWidth.value;
});

const overflowDistance = computed(() => {
    // 用 maxWidth 时，比较 slot 内容宽度 和 maxWidth
    const limit =
        normalizedMaxWidth.value != null
        ? parseFloat(normalizedMaxWidth.value) // px 的情况下有效；如果你传 %/rem 就建议不要依赖该值
        : containerWidth.value;

    // 如果 maxWidth 不是 px（例如 "100%"），parseFloat 仍能拿到数字但意义不准确，
    // 这种情况建议不传 maxWidth，让组件用容器实际宽度来测量。
    const dist = contentWidth.value - limit;
    return dist;
});

const shouldAnimate = computed(() => overflowDistance.value > props.threshold);

const durationSeconds = computed(() => {
    // 跑完整个“超出距离 + gap”所需时间
    if (!shouldAnimate.value) return 0;
    const distance = overflowDistance.value + props.gap;
    return Math.max(0.5, distance / props.speed);
});

const rootStyle = computed(() => ({
    maxWidth: normalizedMaxWidth.value ?? undefined,
}));

const trackStyle = computed(() => ({
    // 给 track 提供 CSS 变量，动画里用
    "--marquee-gap": `${props.gap}px`,
    "--marquee-duration": `${durationSeconds.value}s`,
    "--marquee-delay": `${props.delay}s`,
}));

onMounted(() => {
    const root = rootRef.value;
    const content = contentRef.value;
    if (!root || !content) return;

    const measure = () => {
        containerWidth.value = root.getBoundingClientRect().width;
        // scrollWidth 能拿到实际内容宽度（不被 overflow hidden 截断）
        contentWidth.value = content.scrollWidth;
    };

    ro = new ResizeObserver(() => measure());
    ro.observe(root);
    ro.observe(content);

    // 初始测量
    measure();
});

onBeforeUnmount(() => {
    ro?.disconnect();
    ro = null;
});
</script>

<style scoped>
.marquee-root {
  display: inline-block;
}

/* 视口：裁切 */
.marquee-viewport {
  overflow: hidden;
  white-space: nowrap;
}

/* 轨道：横向排版 */
.marquee-track {
  display: inline-flex;
  align-items: center;
  gap: var(--marquee-gap);
  will-change: transform;
}

/* 内容块：保持不换行 */
.marquee-content {
  display: inline-block;
  white-space: nowrap;
}

/* 动画开启 */
.marquee-track.is-animating {
  animation-name: marquee-move;
  animation-duration: var(--marquee-duration);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: var(--marquee-delay);
}

/* hover 暂停 */
.marquee-track.is-paused {
  animation-play-state: paused;
}

/* 关键帧：移动一个内容宽度 + gap */
@keyframes marquee-move {
  from {
    transform: translateX(0);
  }
  to {
    /* 向左移动：第一份内容完全离开，第二份顶上 */
    transform: translateX(calc(-1 * (100% + var(--marquee-gap))));
  }
}
</style>
