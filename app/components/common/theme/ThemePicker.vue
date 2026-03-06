<template>
    <UPopover :ui="{ content: 'w-72 px-6 py-4 flex flex-col gap-4' }">
        <template #default="{ open }">
            <UButton icon="i-lucide-swatch-book" color="neutral" :variant="open ? 'soft' : 'ghost'" square aria-label="Color picker" :ui="{ leadingIcon: 'text-primary' }" />
        </template>
        <template #content>
            <!--主题色设置-->
            <fieldset>
                <legend class="mb-2 text-[11px] leading-none font-semibold">Primary</legend>
                <div class="-mx-2 grid grid-cols-3 gap-1">
                    <ThemePickerButton v-if="appConfig.theme?.hasOwnProperty('blackAsPrimary')" chip="primary" label="Black" :selected="appConfig.theme?.blackAsPrimary" @click="setBlackAsPrimary(true)">
                        <template #leading>
                            <span class="inline-block h-2 w-2 rounded-full bg-black dark:bg-white" />
                        </template>
                    </ThemePickerButton>
                    <ThemePickerButton v-for="color in primaryColors" :key="color" :label="color" :chip="color" :selected="!appConfig.theme?.blackAsPrimary && primary === color" @click="primary = color" />
                </div>
            </fieldset>
            <!--文本色设置-->
            <fieldset>
                <legend class="mb-2 text-[11px] leading-none font-semibold">Neutral</legend>
                <div class="-mx-2 grid grid-cols-3 gap-1">
                    <ThemePickerButton v-for="color in neutralColors" :key="color" :label="color" :chip="color" :selected="neutral === color" @click="neutral = color" />
                </div>
            </fieldset>
            <!--边框圆角设置-->
            <fieldset>
                <legend class="mb-2 text-[11px] leading-none font-semibold">Radius</legend>
                <div class="-mx-2 grid grid-cols-5 gap-1">
                    <ThemePickerButton v-for="r in radiuses" :key="r" :label="String(r)" class="justify-center px-0" :selected="radius === r" @click="radius = r" />
                </div>
            </fieldset>
        </template>
    </UPopover>
</template>
<script setup lang="ts">
    import { omit } from '#ui/utils'
    import colors from 'tailwindcss/colors'
    const appConfig = useAppConfig()
    //当前主题色cookies,默认存储7天，初始值为appConfig.ui?.colors?.primary
    const primaryColorCookies = usePrimaryColorCookies<string | undefined>(7, appConfig.ui.colors.primary)
    const neutralColors = ['slate', 'gray', 'zinc', 'neutral', 'stone'] as const
    const neutral = computed({
        get() {
            return appConfig.ui?.colors?.neutral
        },
        set(option) {
            appConfig.ui!.colors!.neutral = option
            window.localStorage.setItem('nuxt-ui-neutral', appConfig.ui!.colors!.neutral as string)
        }
    })
    const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', ...neutralColors] as const
    const primaryColors = Object.keys(omit(colors, [...colorsToOmit])) as Array<keyof typeof colors>
    const primary = computed({
        get() {
            const blackAsPrimary = appConfig.theme?.blackAsPrimary
            if (blackAsPrimary) {
                return 'black'
            } else {
                return appConfig.ui?.colors?.primary
            }
        },
        set(option) {
            primaryColorCookies.value = option
            appConfig.ui!.colors!.primary = option
            window.localStorage.setItem('nuxt-ui-primary', appConfig.ui!.colors!.primary as string)
            setBlackAsPrimary(false)
        }
    })
    const radiuses = [0, 0.125, 0.25, 0.375, 0.5]
    const radius = computed({
        get() {
            return appConfig.theme?.radius
        },
        set(option) {
            if (appConfig.theme?.radius) {
                appConfig.theme.radius = option
            } else {
                appConfig.theme = {
                    radius: option,
                    blackAsPrimary: appConfig.theme?.blackAsPrimary
                }
            }
            window.localStorage.setItem('nuxt-ui-radius', String(appConfig.theme.radius))
        }
    })

    /**
     * 是否将black颜色加入主题色
     * @param value
     */
    const setBlackAsPrimary = (value: boolean) => {
        appConfig.theme!.blackAsPrimary = value
        window.localStorage.setItem('nuxt-ui-black-as-primary', String(value))
    }
</script>
