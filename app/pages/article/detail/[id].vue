<template>
    <UPage :ui="{ root: 'lg:grid-cols-14', center: page?.body.toc?.links && page.body.toc.links.length > 0 ? 'lg:col-span-11' : 'lg:col-span-14', right: 'lg:col-span-3 order-first lg:order-last' }" class="bg mt-0 md:mt-5">
        <UPageBody prose class="mt-0 pb-8">
            <UCard :ui="{ body: 'py-0 px-2 sm:pt-0', root: 'border border-default ring-0 md:ring md:ring-default md:border-0' }">
                <UPageHeader :title="page?.title" :description="page?.description" :ui="{ root: 'pt-4', title: 'text-xl md:text-3xl' }">
                    <template #headline>
                        <UBreadcrumb :items="breadcrumb" />
                    </template>
                    <template #description>
                        <div>
                            <div class="grid grid-cols-3 gap-1 md:flex md:justify-start md:gap-5">
                                <WebSiteBlogExtra v-if="page?.categoryInfo?.name" icon-name="wordpress:category" :text="page?.categoryInfo?.name" :to="`/article/category/${page.categoryInfo.symbol}`"> </WebSiteBlogExtra>
                                <WebSiteBlogExtra v-if="page?.tagInfo && page?.tagInfo.length > 0" icon-name="fluent:tag-lock-20-regular" :text="page?.tagInfo[0]?.name!" :to="`/article/tags/${page.tagInfo[0]?.symbol}`" class="hidden md:flex"> </WebSiteBlogExtra>
                                <WebSiteBlogExtra v-if="page?.createDate" icon-name="solar:calendar-line-duotone" :text="page.createDate"> </WebSiteBlogExtra>
                                <WebSiteBlogExtra icon-name="system-uicons:book" :text="page?.wordCount + '字'"> </WebSiteBlogExtra>
                                <WebSiteBlogExtra icon-name="material-symbols-light:hourglass-outline-rounded" :text="page?.readingTime + '分钟'"> </WebSiteBlogExtra>
                                <div class="text-neutral-muted hover:text-neutral flex cursor-pointer items-center gap-1">
                                    <UIcon name="boxicons:hot" />
                                    <div class="waline-pageview-count text-neutral-muted hover:text-neutral text-sm"></div>
                                </div>
                            </div>
                            <div class="mt-2 text-[16px]">{{ page?.description }}</div>
                        </div>
                    </template>
                </UPageHeader>
                <ContentRenderer v-if="page" :value="page" />
            </UCard>
            <div v-if="page?.updateDate" class="-mt-4 text-right text-[15px] text-[#7f7f7f]">最后更新时间: {{ page?.updateDate }}</div>
            <UContentSurround :surround="surroundComputed" />
            <WebSiteComment></WebSiteComment>
        </UPageBody>
        <template v-if="page?.body?.toc?.links" #right>
            <UContentToc title="快捷导航目录" highlight highlight-color="primary" color="primary" :links="page?.body?.toc?.links" :ui="{ container: 'sm:pt-4 lg:pt-4 border-0', root: 'bg-default mx-0 mb-2 md:px-4 md:-mx-2 md:mr-0 h-fit' }" class="border-default rounded-lg border md:top-[calc(var(--ui-header-height)+20px)]" />
        </template>
    </UPage>
</template>

<script setup lang="ts">
    import { pageviewCount } from '@waline/client'
    definePageMeta({ layout: 'blank' })
    const config = useRuntimeConfig()
    const route = useRoute()
    const { data: page } = await useAsyncData(route.path, () => queryCollection('blog').where('articleId', '=', route.params.id).first())
    const { data: surround } = await useAsyncData(route.path + '-surround', () =>
        queryCollectionItemSurroundings('blog', page.value!.path, {
            fields: ['articleId']
        })
    )
    const surroundComputed = computed(() => {
        const arr: any[] = []
        if (surround.value) {
            const prev = surround.value[0]
            const next = surround.value[1]
            if (prev != null) {
                arr.push({ title: '上一篇', path: `/article/detail/${prev.articleId}`, description: prev.title })
            } else {
                arr.push(null)
            }
            if (next != null) {
                arr.push({ title: '下一篇', path: `/article/detail/${next.articleId}`, description: next.title })
            } else {
                arr.push(null)
            }
        }
        return arr
    })
    const breadcrumb = ref([
        {
            label: '首页',
            icon: 'i-lucide-house',
            to: '/'
        },
        {
            label: page.value?.title
        }
    ])
    useSeoMeta({
        title: () => page.value?.title,
        description: () => page.value?.description,
        keywords: () => page.value?.keywords
    })
    onMounted(() => {
        //更新浏览量
        pageviewCount({
            serverURL: config.public.NUXT_COMMENT_BASE_URL,
            path: `/article/detail/${page?.value?.articleId}`,
            update: true
        })
    })
</script>
