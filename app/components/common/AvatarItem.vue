<template>
    <div v-if="img" ref="avatar" class="bg-elevated inline-flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full p-1 align-middle text-base select-none">
        <img v-if="isImg" :src="realSrc" class="size-6 group-hover:scale-90 group-hover:transition-all group-hover:duration-500" />
        <UAvatar v-else :icon="realSrc" v-bind="$attrs" :ui="{ icon: 'size-6 group-hover:scale-90 group-hover:transition-all group-hover:duration-500' }" />
    </div>
</template>

<script setup lang="ts">
    const { img } = defineProps<{ img: string }>()
    const target = useTemplateRef<HTMLDivElement>('avatar')
    const isImg = computed(() => {
        const imageRegex = /\.(jpg|jpeg|png|gif|bmp|tiff|svg|webp)$/i
        if (img) {
            return imageRegex.test(img)
        } else {
            return false
        }
    })
    const realSrc = ref('https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250725234530612.png')
    const { stop } = useIntersectionObserver(target, ([entry], _observerElement) => {
        if (entry?.isIntersecting) {
            realSrc.value = img
            stop()
        }
    })
</script>
