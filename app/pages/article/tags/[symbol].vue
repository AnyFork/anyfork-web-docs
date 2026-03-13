<template>
    <div class="w-full">
        <UBreadcrumb :items="breadcrumb" class="pb-2 md:pb-4" />
        <UPage :ui="{ left: 'lg:col-span-2', center: 'lg:col-span-8' }">
            <template #right>
                <UPageAside class="dark:bg-muted border-default md:ring-default block h-fit rounded-[calc(var(--ui-radius)*2)] border py-2 md:border-0 md:ring lg:top-[calc(var(--ui-header-height)+20px)] lg:py-4 lg:pe-4">
                    <UTree v-model="clickTreeItem" :items="tag" label-key="name" value-key="id" @update:model-value="selectTreeNode">
                        <template #item-leading="{ item }">
                            <Icon v-if="item?.icon" :name="item?.icon" class="size-5 shrink-0" />
                        </template>
                    </UTree>
                </UPageAside>
            </template>
            <UPageBody class="mt-2 pb-4 md:mt-0">
                <div v-if="blog && blog.length > 0">
                    <WebSiteBlogCard v-for="(item, index) in blog" :key="index" :article="item" :position="(index + 1) % 2 == 0 ? 'left' : 'right'"></WebSiteBlogCard>
                    <div v-if="blog.length > pageSize" class="text-neutral flex flex-wrap items-center justify-center gap-1">
                        <UPagination v-model:page="page" :items-per-page="pageSize" :total="blog.length" />
                        <span class="text-[14px] md:text-[16px]">共{{ blog.length }}条</span>
                    </div>
                </div>
                <div v-else class="border-default flex flex-col items-center justify-center rounded-[calc(var(--ui-radius)*2)] border py-50">
                    <SvgoEmpty class="block size-30! text-[#f5f5f5]"></SvgoEmpty>
                    <div class="text-muted">暂无数据</div>
                </div>
            </UPageBody>
        </UPage>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({ layout: 'blank' })
    const route = useRoute()
    const router = useRouter()
    const symbol = ref(route.params.symbol as unknown as string)
    const dictNode = computed(() => tag.find((s) => s.symbol == symbol.value))
    if (!dictNode.value) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
    }
    const page = ref(1)
    const pageSize = ref(10)
    const clickTreeItem = ref(dictNode.value)
    const { data: blog } = await useAsyncData(symbol, () =>
        queryCollection('blog')
            .where('tagIds', 'LIKE', '%' + dictNode.value?.id + '%')
            .all()
    )

    const breadcrumb = ref([
        {
            label: '首页',
            icon: 'i-lucide-house',
            to: '/'
        },
        {
            label: '文章标签',
            icon: 'fluent:tag-lock-20-regular'
        }
    ])
    /**
     * 点击树节点触发回调
     * @param node
     */
    const selectTreeNode = (node: (typeof tag)[number]) => {
        router.push(`/article/tags/${node.symbol}.html`)
    }
</script>
