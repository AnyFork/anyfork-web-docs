<template>
    <UFooter class="bg-default z-50 w-full pb-2 md:fixed md:bottom-0 md:bg-(--ui-bg)/75 md:pb-0 md:backdrop-blur" :ui="{ top: 'py-1 lg:py-0', container: 'py-0 lg:py-0', center: 'mt-1', left: 'mt-1' }">
        <template #top>
            <USeparator>
                <ULink to="https://nuxt.com/" target="_blank" class="text-primary inline-block cursor-pointer">
                    <UAvatar src="https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250725234530612.png" class="h-6 w-6 md:h-8 md:w-8" />
                </ULink>
            </USeparator>
        </template>
        <template #left>
            <div class="flex items-center text-[14px] md:text-[16px]">
                <UIcon name="i-heroicons-shield-check-20-solid" class="mr-0.5" />
                <ULink to="https://beian.miit.gov.cn" target="_blank" class="text-neutral-muted">{{ appConfig?.website?.footer?.icpRecord }}</ULink>
            </div>
        </template>
        <div class="flex items-center text-[14px] md:py-2 md:text-[16px]">
            <UIcon name="ri:copyright-line" />
            <div class="text-neutral-muted">{{ appConfig?.website?.footer?.copyright }}</div>
        </div>
        <template #right>
            <div class="text-neutral-muted flex items-center text-[14px] md:text-[16px]">
                <div class="flex items-center">
                    <UIcon name="icon-park-solid:email-lock" class="mt-0.1 mr-0.5" />
                    <span> 联系邮箱:</span>
                </div>
                <div class="-mt-1 pl-1">{{ appConfig?.website?.footer?.email }}</div>
            </div>
        </template>
    </UFooter>
</template>
<script setup lang="ts">
    const appConfig = useAppConfig()
</script>
