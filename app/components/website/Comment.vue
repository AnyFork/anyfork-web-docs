<!-- eslint-disable vue/attribute-hyphenation -->
<template>
    <Waline :serverURL="runtimeConfig.public.NUXT_COMMENT_BASE_URL" :path="$route.path" lang="zh-CN" :dark="isDark" reaction :locale="locale" />
</template>

<script setup lang="ts">
    import { Waline } from '@waline/client/component'
    import '@waline/client/style'
    const runtimeConfig = useRuntimeConfig()
    const colorMode = useColorMode()
    const isDark = computed({
        get() {
            return colorMode.value === 'dark'
        },
        set(_isDark) {
            colorMode.preference = _isDark ? 'dark' : 'light'
        }
    })
    const locale = {
        level0: '炼体',
        level1: '炼气',
        level2: '筑基',
        level3: '金丹',
        level4: '元婴',
        level5: '化神'
    }
</script>
