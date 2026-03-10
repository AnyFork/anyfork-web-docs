<script setup lang="ts">
    const appConfig = useAppConfig()
    const open = ref(false)
    const { neutralColors, neutral, primaryColors, primary, setBlackAsPrimary, radiuses, radius, fonts, font, icon, icons, resetTheme } = useTheme()
</script>

<template>
    <UPopover v-model:open="open" :ui="{ content: 'w-72 px-6 py-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-5rem)]' }">
        <template #default>
            <UButton icon="i-lucide-swatch-book" color="neutral" :variant="open ? 'soft' : 'ghost'" square aria-label="Color picker" :ui="{ leadingIcon: 'text-primary' }" />
        </template>
        <template #content>
            <!--主题色-->
            <fieldset>
                <div class="flex items-center justify-between">
                    <legend class="mb-2 flex items-center gap-1 text-[12px] leading-none font-semibold select-none">
                        Primary
                        <UButton to="https://ui.nuxt.com/docs/getting-started/theme/css-variables#colors" target="_blank" size="xs" color="neutral" variant="link" icon="i-lucide-help-circle" class="-my-0.5 p-0" :ui="{ leadingIcon: 'size-3' }" />
                    </legend>
                    <div class="mb-2 flex items-center justify-between gap-1">
                        <UTooltip text="Reset theme">
                            <UButton color="neutral" variant="outline" size="xs" icon="i-lucide-rotate-ccw" class="ring-default hover:bg-elevated/50 ms-auto" :ui="{ leadingIcon: 'size-2' }" @click="resetTheme" />
                        </UTooltip>
                    </div>
                </div>
                <div class="-mx-2 grid grid-cols-3 gap-1">
                    <ThemePickerButton label="Black" :selected="appConfig.theme.blackAsPrimary" @click="setBlackAsPrimary(true)">
                        <template #leading>
                            <span class="inline-block h-2 w-2 rounded-full bg-black dark:bg-white" />
                        </template>
                    </ThemePickerButton>
                    <ThemePickerButton v-for="color in primaryColors" :key="color" :label="color" :chip="color" :selected="!appConfig.theme.blackAsPrimary && primary === color" @click="primary = color" />
                </div>
            </fieldset>
            <!-- 文本颜色 -->
            <fieldset>
                <legend class="mb-2 flex items-center gap-1 text-[12px] leading-none font-semibold select-none">
                    Neutral
                    <UButton to="https://ui.nuxt.com/docs/getting-started/theme/css-variables#text" size="xs" color="neutral" variant="link" icon="i-lucide-help-circle" class="-my-0.5 p-0" :ui="{ leadingIcon: 'size-3' }" />
                </legend>
                <div class="-mx-2 grid grid-cols-3 gap-1">
                    <ThemePickerButton v-for="color in neutralColors" :key="color" :label="color" :chip="color === 'neutral' ? 'old-neutral' : color" :selected="neutral === color" @click="neutral = color" />
                </div>
            </fieldset>
            <!--radius值 -->
            <fieldset>
                <legend class="mb-2 flex items-center gap-1 text-[12px] leading-none font-semibold select-none">
                    Radius
                    <UButton to="https://ui.nuxt.com/docs/getting-started/theme/css-variables#radius" size="xs" color="neutral" variant="link" icon="i-lucide-help-circle" class="-my-0.5 p-0" :ui="{ leadingIcon: 'size-3' }" />
                </legend>
                <div class="-mx-2 grid grid-cols-5 gap-1">
                    <ThemePickerButton v-for="r in radiuses" :key="r" :label="String(r)" class="justify-center px-0" :selected="radius === r" @click="radius = r" />
                </div>
            </fieldset>
            <!--字体设置-->
            <fieldset>
                <legend class="mb-2 flex items-center gap-1 text-[12px] leading-none font-semibold select-none">
                    Font
                    <UButton to="https://ui.nuxt.com/docs/getting-started/integrations/fonts" size="xs" color="neutral" variant="link" icon="i-lucide-help-circle" class="-my-0.5 p-0" :ui="{ leadingIcon: 'size-3' }" />
                </legend>
                <div class="-mx-2">
                    <USelect v-model="font" size="sm" color="neutral" icon="i-lucide-type" :items="fonts" class="ring-default hover:bg-elevated/50 data-[state=open]:bg-elevated/50 w-full rounded-sm text-[12px]" :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }" />
                </div>
            </fieldset>
            <!--图标设置 -->
            <fieldset>
                <legend class="mb-2 flex items-center gap-1 text-[12px] leading-none font-semibold select-none">
                    Icons
                    <UButton to="/docs/getting-started/integrations/icons" size="xs" color="neutral" variant="link" icon="i-lucide-help-circle" class="-my-0.5 p-0" :ui="{ leadingIcon: 'size-3' }" />
                </legend>
                <div class="-mx-2">
                    <USelect v-model="icon" size="sm" color="neutral" :icon="icons.find((i) => i.value === icon)?.icon" :items="icons" class="ring-default hover:bg-elevated/50 data-[state=open]:bg-elevated/50 w-full rounded-sm text-[12px] capitalize" :ui="{ item: 'capitalize text-[12px]', trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }" />
                </div>
            </fieldset>
        </template>
    </UPopover>
</template>
