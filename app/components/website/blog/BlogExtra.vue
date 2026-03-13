<template>
    <div class="text-neutral-muted hover:text-neutral flex cursor-pointer items-center gap-1">
        <UIcon v-if="iconName" :name="iconName" />
        <NuxtLink v-if="to" :to="to" :style="{ fontSize: textSize }">{{ text }}</NuxtLink>
        <div v-else :style="{ fontSize: textSize }">{{ text }}</div>
    </div>
</template>
<script setup lang="ts">
    const { textSize = '14px', iconName = undefined, to = undefined } = defineProps<{ iconName?: string; text: string; textSize?: string; to?: string }>()
</script>
