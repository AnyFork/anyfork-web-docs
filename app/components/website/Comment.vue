<template>
    <div id="waline"></div>
</template>
<script setup lang="ts">
    import { init } from '@waline/client'
    import '@waline/client/style'

    const runtimeConfig = useRuntimeConfig()
    const route = useRoute()
    const path = computed(() => route.path)

    onMounted(() => {
        init({
            el: '#waline',
            serverURL: runtimeConfig.public.NUXT_COMMENT_BASE_URL,
            path: path.value,
            reaction: true,
            locale: {
                level0: '炼体',
                level1: '炼气',
                level2: '筑基',
                level3: '金丹',
                level4: '元婴',
                level5: '化神'
            },
            lang: 'zh-CN'
        })
    })
</script>
