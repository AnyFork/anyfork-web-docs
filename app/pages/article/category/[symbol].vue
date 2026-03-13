<script setup lang="ts">
    definePageMeta({ layout: 'blank' })
    const router = useRouter()
    const route = useRoute()
    const symbol = ref(route.params.symbol as unknown as string)
    const dictNode = computed(() => category.find((s) => s.symbol == symbol.value))
    if (!dictNode.value) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
    }
    const page = ref(1)
    const pageSize = ref(10)
    const clickTreeItem = ref(dictNode.value)
    const { data: blog } = await useAsyncData(symbol, () => queryCollection('blog').where('categoryId', '=', dictNode.value?.id).all())
    // blog总数
    const total = computed(() => blog.value?.length || 0)
    /**
     * 计算当前页面blog数据
     */
    const currentBlogPage = computed(() => {
        if (blog.value && blog.value.length > 0) {
            const currentMinNumber = (page.value - 1) * pageSize.value
            const currentMaxNumber = page.value * pageSize.value
            return blog.value.slice(currentMinNumber, currentMaxNumber)
        } else {
            return []
        }
    })
    const breadcrumb = ref([
        {
            label: '首页',
            icon: 'i-lucide-house',
            to: '/'
        },
        {
            label: '文章分类',
            icon: 'wordpress:category'
        }
    ])
    /**
     * 点击树节点触发回调
     * @param node
     */
    const selectTreeNode = (node: (typeof category)[number]) => {
        router.push(`/article/category/${node.symbol}`)
    }
</script>

<template>
    <div class="w-full">
        <UBreadcrumb :items="breadcrumb" class="pb-2 md:pb-4" />
        <UPage :ui="{ left: 'lg:col-span-2', center: 'lg:col-span-8' }">
            <template #left>
                <UPageAside class="dark:bg-muted border-default md:ring-default block h-fit rounded-lg border py-2 md:border-0 md:ring lg:top-[calc(var(--ui-header-height)+20px)] lg:py-4 lg:pe-4">
                    <UTree v-model="clickTreeItem" :items="category" label-key="name" value-key="id" @update:model-value="selectTreeNode">
                        <template #item-leading="{ item }">
                            <Icon v-if="item?.icon" :name="item?.icon" class="size-5 shrink-0" />
                        </template>
                    </UTree>
                </UPageAside>
            </template>
            <UPageBody class="mt-2 pb-4 md:mt-0">
                <div v-if="total > 0">
                    <WebSiteBlogCard v-for="(item, index) in currentBlogPage" :key="index" :article="item" :position="(index + 1) % 2 == 0 ? 'left' : 'right'"></WebSiteBlogCard>
                    <div v-if="total > pageSize" class="text-neutral flex flex-wrap items-center justify-center gap-1">
                        <UPagination v-model:page="page" :items-per-page="pageSize" :total="total" />
                        <span class="text-[14px] md:text-[16px]">共{{ total }}条</span>
                    </div>
                </div>
                <div v-else class="border-default flex flex-col items-center justify-center rounded-lg border py-50">
                    <SvgoEmpty class="block size-30! text-[#f5f5f5]"></SvgoEmpty>
                    <div class="text-muted">暂无数据</div>
                </div>
            </UPageBody>
        </UPage>
    </div>
</template>
