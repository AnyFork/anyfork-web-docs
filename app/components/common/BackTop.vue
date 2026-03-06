<template>
    <transition leave-active-class="animate__animated animate__fadeOutRight" enter-active-class="animate__animated animate__backInLeft" mode="out-in">
        <div v-show="show" class="fixed z-1000 flex h-11 min-w-11 cursor-pointer items-center justify-center rounded-[22px] bg-transparent shadow-[0_2px_8px_0px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_2px_8px_3px_rgba(0,0,0,0.12)]" :style="`bottom: ${bottomPosition}; right: ${rightPosition};`" @click="y = 0">
            <UIcon name="i-heroicons-arrow-up-circle" class="text-primary h-8.75 w-8.75"></UIcon>
        </div>
    </transition>
</template>
<script setup lang="ts">
    import { useWindowScroll } from '@vueuse/core'
    const {
        bottom = 80,
        right = 40,
        visibilityHeight = 180
    } = defineProps<{
        /**距离页面底部的高度 */
        bottom?: number | string
        /**距离页面右侧的宽度 */
        right?: number | string
        /**滚动时触发显示回到顶部的高度 */
        visibilityHeight?: number
    }>()
    //滚动条在y轴上的滚动距离
    const { y } = useWindowScroll({ behavior: 'smooth' })
    const bottomPosition = computed(() => (typeof bottom === 'number' ? bottom + 'px' : bottom))
    const rightPosition = computed(() => (typeof right === 'number' ? right + 'px' : right))
    const show = computed(() => y.value >= visibilityHeight)
</script>
