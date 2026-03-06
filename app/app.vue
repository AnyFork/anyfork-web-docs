<template>
    <UApp :locale="zh_cn" :toaster="appConfig.toaster">
        <NuxtLoadingIndicator :color="nuxtLoadingIndicatorSuccessColor" :error-color="nuxtLoadingIndicatorErrorColor" />
        <NuxtLayout>
            <NuxtPage />
        </NuxtLayout>
        <div v-if="!$route.path.includes('admin')" class="invisible md:visible">
            <!--音乐播放器-->
            <MusicPlayer />
            <!--樱花特效-->
            <SakuraEffect />
            <!--动态title -->
            <DynamicTitle />
            <!--水印背景 -->
            <WaterMaker />
        </div>
        <!--返回顶部 -->
        <BackTop :right="$device.isMobile ? 10 : 40" class="dark:bg-muted bg-white" />
    </UApp>
</template>
<script setup lang="ts">
    import { zh_cn } from '@nuxt/ui/locale'
    import colors from 'tailwindcss/colors'
    const appConfig = useAppConfig()
    const colorMode = useColorMode()
    const primaryColorCookies = usePrimaryColorCookies(7, appConfig.ui?.colors?.primary)
    const color = computed(() => (colorMode.value === 'dark' ? colors[appConfig.ui?.colors?.neutral as keyof typeof colors][900] : 'white'))
    const radius = computed(() => `:root { --ui-radius: ${appConfig.theme?.radius}rem; }`)
    const blackAsPrimary = computed(() => (appConfig.theme?.blackAsPrimary ? `:root { --ui-primary: black;--ui-color-primary-100: oklch(0.5103 0 0);--ui-color-primary-600: oklch(0 0 0); } .dark { --ui-primary: white;--ui-color-primary-100: oklch(0.683 0 0);--ui-color-primary-600: oklch(1 0 0) }` : ':root {}'))
    const nuxtLoadingIndicatorSuccessColor = computed(() => `repeating-linear-gradient(to right,var(--color-${primaryColorCookies.value}-50) 0%,var(--color-${primaryColorCookies.value}-500) 50%,var(--color-${primaryColorCookies.value}-900) 100%)`)
    const nuxtLoadingIndicatorErrorColor = computed(() => `repeating-linear-gradient(to right,var(--color-${appConfig.ui?.colors?.error}-50) 0%,var(--color-${appConfig.ui?.colors?.error}-500) 50%,var(--color-${appConfig.ui?.colors?.error}-900) 100%)`)
    useHead({
        meta: [{ key: 'theme-color', name: 'theme-color', content: color }],
        style: [
            { innerHTML: radius, id: 'nuxt-ui-radius', tagPriority: -2 },
            { innerHTML: blackAsPrimary, id: 'nuxt-ui-black-as-primary', tagPriority: -2 }
        ]
    })
</script>
