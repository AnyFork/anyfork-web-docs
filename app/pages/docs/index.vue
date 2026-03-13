<template>
    <UPage :ui="ui">
        <UBreadcrumb :items="breadcrumb" class="pb-1" />
        <UPageBody class="mt-2 md:mt-0"> </UPageBody>
    </UPage>
</template>

<script setup lang="ts">
    import type { PageProps } from '@nuxt/ui'
    definePageMeta({ layout: 'blank' })
    const ui: PageProps['ui'] = { center: 'lg:col-span-10' }
    const breadcrumb = ref([
        {
            label: '首页',
            icon: 'i-lucide-house',
            to: '/'
        },
        {
            label: '文档',
            icon: 'material-symbols:docs-outline'
        }
    ])
</script>
