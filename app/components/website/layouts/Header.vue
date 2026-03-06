<template>
    <UHeader v-model:open="open" mode="slideover" :menu="menu" toggle-side="left" class="border-default bg-default sticky top-0 z-50 border-b md:bg-(--ui-bg)/75 md:backdrop-blur" :ui="{ content: 'w-[70%]' }">
        <!--自定义顶部插槽-->
        <template v-if="$device.isDesktop" #top>
            <!--顶部内容阅读进度条 -->
            <LoadingProgress></LoadingProgress>
        </template>
        <!--自定义标题插槽-->
        <template #title>
            <div class="flex shrink-0 items-center gap-2">
                <UColorModeImage light="/logo-light.png" dark="/logo-dark.png" class="-ml-2 h-12.5 w-36.25 md:ml-0 md:h-13.75 md:w-40" />
            </div>
        </template>
        <UNavigationMenu :items="item" color="primary" class="w-full justify-center" :ui="{ list: 'gap-4' }" />
        <!--右侧主题颜色和主题色切换按钮 -->
        <template #right>
            <!--主题颜色选择器-->
            <ThemePicker />
            <!--light和dark颜色切换按钮 -->
            <UColorModeSwitch />
            <!-- DocSearch文档搜索 -->
            <AlgoliaDocSearch />
        </template>
        <!--移动端菜单-->
        <template #content>
            <div class="py-2">
                <div class="border-default flex items-center justify-between border-b px-2 pb-2">
                    <NuxtLink to="/" class="flex items-center gap-2">
                        <UColorModeImage light="/logo-light.png" dark="/logo-dark.png" class="-ml-2 h-12.5 w-36.25 md:ml-0 md:h-13.75 md:w-40" />
                    </NuxtLink>
                    <UIcon name="i-lucide:x" class="size-5" @click="open = false" />
                </div>
                <UNavigationMenu :items="appConfig?.website?.header?.menu" orientation="vertical" class="mt-2 px-2" />
            </div>
        </template>
    </UHeader>
</template>
<script setup lang="ts">
    import type { NavigationMenuItem, SlideoverProps } from '@nuxt/ui'
    const route = useRoute()
    const appConfig = useAppConfig()
    const open = ref(false)
    const menu: SlideoverProps = { side: 'left' }
    const item = ref<NavigationMenuItem[]>(appConfig?.website?.header?.menu as NavigationMenuItem[])
    watch(
        () => route.path,
        (newPath, _oldPath) => {
            const menu = appConfig?.website?.header?.menu as NavigationMenuItem[]
            if (newPath == '/') {
                menu.forEach((item, index) => {
                    if (index == 0) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
            } else if (newPath.indexOf('docs') > -1) {
                menu.forEach((item, index) => {
                    if (index == 1) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
            } else if (newPath.indexOf('category') > -1) {
                menu.forEach((item, index) => {
                    if (index == 2) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
            } else if (newPath.indexOf('tags') > -1) {
                menu.forEach((item, index) => {
                    if (index == 3) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
            } else if (newPath.indexOf('links') > -1) {
                menu.forEach((item, index) => {
                    if (index == 4) {
                        item.active = true
                    } else {
                        item.active = false
                    }
                })
            }
            item.value = menu
        },
        {
            immediate: true
        }
    )
</script>
