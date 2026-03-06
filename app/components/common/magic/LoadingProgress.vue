<template>
    <UProgress v-show="percentage != 0" v-model="percentage" color="primary" :indicator="false" size="sm" class="h-2px absolute left-0" />
</template>

<script setup lang="ts">
    import { useWindowScroll, useWindowSize } from '@vueuse/core'
    const percentage = ref(0)
    //滚动条在y轴上的滚动距离
    const { y } = useWindowScroll()
    //浏览器可视窗口高度
    const { height } = useWindowSize()
    //文档总高度
    const documentScrollHeight = () => Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
    //计算文档内容进度条
    const loadingProgress = () => {
        const percentageNumber = documentScrollHeight() - height.value
        percentage.value = Number(y.value / percentageNumber) * 100
    }
    watch(y, () => {
        loadingProgress()
    })
</script>
