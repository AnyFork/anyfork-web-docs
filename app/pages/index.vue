<script setup lang="ts">
    const page = ref(1)
    const pageSize = ref(10)
    // 查询所有博客数据,筛选条件：过滤掉隐藏的，优先置顶排序，然后创建时间
    const { data: blog } = await useAsyncData('allBlog', () => queryCollection('blog').where('isHidden', '=', false).order('isTop', 'DESC').order('createDate', 'DESC').all())
    // 查询热门博客数据
    const { data: hotArticle } = await useAsyncData('hotBlog', () =>
        queryCollection('blog')
            .where('isHidden', '=', false)
            .andWhere((query) => query.where('isHot', '=', true))
            .limit(10)
            .order('isTop', 'DESC')
            .order('createDate', 'DESC')
            .all()
    )
    // 查询推荐博客数据
    const { data: recommendArticle } = await useAsyncData('recommendBlog', () =>
        queryCollection('blog')
            .where('isHidden', '=', false)
            .andWhere((query) => query.where('isRecommend', '=', true))
            .limit(10)
            .order('isTop', 'DESC')
            .order('createDate', 'DESC')
            .all()
    )
    // blog总数
    const total = computed(() => blog.value?.length || 0)
    /**
     * 计算当前页面blog数据
     */
    const currentBlogPage = computed(() => {
        if (blog.value && blog.value.length > 0) {
            const currentMinNumber = page.value - 1
            const currentMaxNumber = page.value * pageSize.value - 1
            return blog.value.slice(currentMinNumber, currentMaxNumber)
        } else {
            return []
        }
    })
    /**
     * 计算和统计分类和标签数量
     */
    const cateComputed = computed(() => {
        const categoryArray: typeof category = []
        const tagArray: typeof tag = []
        const cateIdTemp: number[] = []
        const tagIdTemp: number[] = []
        const cateTemp: Record<number, number> = {}
        const tagTemp: Record<number, number> = {}
        blog.value?.forEach((item) => {
            if (cateIdTemp.includes(item.categoryId)) {
                cateTemp[item.categoryId as number] = cateTemp[item.categoryId as number]! + 1
            } else {
                cateTemp[item.categoryId] = 1
                cateIdTemp.push(item.categoryId as number)
                categoryArray.push(category.find((s) => s.id == item.categoryId)!)
            }
            if (item.tagIds && item.tagIds.length > 0) {
                item.tagIds.forEach((s) => {
                    if (tagIdTemp.includes(Number(s))) {
                        tagTemp[Number(s)] = tagTemp[Number(s)]! + 1
                    } else {
                        tagTemp[Number(s)] = 1
                        tagIdTemp.push(Number(s))
                        tagArray.push(tag.find((m) => m.id == Number(s))!)
                    }
                })
            }
        })
        return { cateTemp, tagTemp, categoryArray, tagArray }
    })
    const indexLink = getShowIndexLink()
</script>

<template>
    <UPage :ui="{ center: 'lg:col-span-7 order-first', right: 'lg:col-span-3  lg:order-last' }">
        <UPageBody prose class="mt-0 mb-1 pb-2">
            <WebSiteBlogCard v-for="(article, index) in currentBlogPage" :key="index" :to="`/article/detail/${article.id}.html`" :article="article" :position="(index + 1) % 2 == 0 ? 'left' : 'right'"></WebSiteBlogCard>
            <div v-if="total > pageSize" class="text-neutral flex flex-wrap items-center justify-center gap-1">
                <UPagination v-model:page="page" :items-per-page="pageSize" :total="total" />
                <span class="text-[14px] md:text-[16px]">共{{ total }}条</span>
            </div>
        </UPageBody>
        <template #right>
            <UCard class="text-neutral h-fit" :ui="{ body: 'relative px-1 py-0! sm:p-6 md:px-2', root: 'ring-0 md:ring md:ring-default' }">
                <!--热门文章-->
                <div v-if="hotArticle && hotArticle.length > 0">
                    <div class="dark:bg-muted border-l-primary border-default my-2 flex items-center gap-1 rounded-[calc(var(--ui-radius)*2)] border border-l-[3px] border-solid px-2 py-1 text-[16px] leading-6 font-bold">
                        <Icon name="noto:fire" class="size-5" />
                        <span>热门文章</span>
                    </div>
                    <div class="dark:bg-muted rounded-[calc(var(--ui-radius)*2)]">
                        <div v-for="(item, index) in hotArticle" :key="'hot' + index" class="group flex gap-x-2 border-b border-dashed border-b-neutral-200 py-1 text-[14px]">
                            <span class="group-hover:text-primary text-muted">{{ index + 1 }}</span>
                            <ULink :to="`/article/detail/${item.articleId}.html`" target="_blank" class="hover:text-primary line-clamp-2">{{ item.title }}</ULink>
                        </div>
                    </div>
                </div>
                <!--精选文章-->
                <div v-if="recommendArticle && recommendArticle?.length > 0">
                    <div class="dark:bg-muted border-l-primary border-default my-2 flex items-center gap-1 rounded-[calc(var(--ui-radius)*2)] border border-l-[3px] border-solid px-2 py-1 text-[16px] leading-6 font-bold">
                        <Icon name="material-symbols-light:recommend-outline" class="size-5.5" />
                        <span>精选文章</span>
                    </div>
                    <div class="dark:bg-muted rounded-[calc(var(--ui-radius)*2)]">
                        <div v-for="(item, index) in recommendArticle" :key="'hot' + index" class="flex gap-x-2 border-b border-dashed border-b-neutral-200 py-1 text-[14px]">
                            <div class="group flex items-center gap-2">
                                <img :src="item.articleThumb" class="w-1/3 rounded transition-transform group-hover:scale-95" />
                                <div>
                                    <ULink :to="`/article/detail/${item.articleId}.html`" target="_blank" class="hover:text-primary line-clamp-2">{{ item.title }}</ULink>
                                    <p class="text-neutral-muted pt-1 text-[13px]">{{ item.createDate }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!--文章分类 -->
                <div v-if="cateComputed.categoryArray?.length > 0">
                    <div class="dark:bg-muted border-l-primary border-default my-2 flex items-center justify-between gap-1 rounded-[calc(var(--ui-radius)*2)] border border-l-[3px] border-solid px-2 py-1 text-[16px] leading-6 font-bold">
                        <div class="flex items-center gap-1">
                            <Icon name="wordpress:category" class="size-5" />
                            <span>文章分类</span>
                        </div>
                        <ULink to="/article/category/search.html" target="_blank" class="text-primary hover:text-primary flex items-center">
                            <UIcon name="i-mingcute-right-line" class="cursor-pointer text-[24px] hover:scale-110" />
                        </ULink>
                    </div>
                    <div class="my-1 w-full">
                        <NuxtLink v-for="(cateItem, index) in cateComputed.categoryArray" :key="'category' + index" :to="`/article/category/${cateItem.symbol}.html`" target="_blank" class="hover:bg-primary/10 hover:border-primary bg-default text-neutral-muted dark:bg-muted border-default my-1 flex h-8 w-full cursor-pointer items-center justify-between rounded-[calc(var(--ui-radius)*2)] border pr-3.5 pl-2 text-[14px]">
                            <div class="flex items-center gap-1">
                                <Icon v-if="cateItem.icon" :name="cateItem.icon" class="size-4" />
                                <span>{{ cateItem.name }}</span>
                            </div>
                            <span class="h-4 w-4 rounded-[calc(var(--ui-radius)*2)] text-center text-[9px] leading-4 text-white" :style="{ 'background-color': 'var(--ui-primary)' }">{{ cateComputed.cateTemp[cateItem.id as number]! > 99 ? '99+' : cateComputed.cateTemp[cateItem.id as number]! }} </span>
                        </NuxtLink>
                    </div>
                </div>
                <!--文章标签-->
                <div v-if="cateComputed.tagArray?.length > 0">
                    <div class="dark:bg-muted border-l-primary border-default my-2 flex items-center justify-between gap-1 rounded-[calc(var(--ui-radius)*2)] border border-l-[3px] border-solid px-2 py-1 text-[16px] leading-6 font-bold">
                        <div class="flex items-center gap-1">
                            <Icon name="fluent:tag-lock-20-regular" class="size-5" />
                            <span>文章标签</span>
                        </div>
                        <ULink to="/article/tags/algolia.html" target="_blank" class="text-primary hover:text-primary flex items-center">
                            <UIcon name="i-mingcute-right-line" class="cursor-pointer text-[24px] hover:scale-110" />
                        </ULink>
                    </div>
                    <div class="grid grid-cols-2 gap-2">
                        <NuxtLink v-for="(tagItem, index) in cateComputed.tagArray" :key="'tag' + index" :to="`/article/tags/${tagItem.symbol}.html`" target="_blank" class="hover:bg-primary/10 hover:border-primary bg-default text-neutral-muted dark:bg-muted border-default flex items-center justify-between rounded-[calc(var(--ui-radius)*2)] border p-1 text-[14px]">
                            <div class="flex items-center gap-1">
                                <Icon v-if="tagItem.icon" :name="tagItem.icon" class="size-4" />
                                <span>{{ tagItem.name }}</span>
                            </div>
                            <span class="mr-1.75 ml-1.25 h-4 w-4 rounded-[calc(var(--ui-radius)*2)] text-center text-[9px] leading-4 text-white" :style="{ 'background-color': 'var(--ui-primary)' }">{{ cateComputed.tagTemp[tagItem.id]! > 99 ? '99+' : cateComputed.tagTemp[tagItem.id] }} </span>
                        </NuxtLink>
                    </div>
                </div>
                <!--快捷导航-->
                <div v-if="indexLink?.length > 0">
                    <div class="dark:bg-muted border-l-primary border-default my-2 flex items-center justify-between gap-1 rounded-[calc(var(--ui-radius)*2)] border border-l-[3px] border-solid px-2 py-1 text-[16px] leading-6 font-bold">
                        <div class="flex items-center gap-1">
                            <Icon name="fluent:cloud-link-20-regular" class="size-5" />
                            <span>快捷导航</span>
                        </div>
                        <ULink to="/links.html" target="_blank" class="text-primary hover:text-primary flex items-center">
                            <UIcon name="i-mingcute-right-line" class="cursor-pointer text-[24px] hover:scale-110" />
                        </ULink>
                    </div>
                    <div class="my-1 flex flex-wrap gap-y-4">
                        <ULink v-for="(linkCard, index) in indexLink" :key="'link-item' + index" :to="linkCard.linkHref" target="_blank" class="group dark:bg-muted border-default bg-default hover:bg-primary/10 hover:border-primary relative flex w-full items-center gap-x-3 rounded-[calc(var(--ui-radius)*2)] border px-2.5 py-4 transition-colors">
                            <AvatarItem v-if="linkCard.linkIcon" :img="linkCard.linkIcon" class="size-10 shrink-0" />
                            <Icon name="i-lucide:arrow-up-right" class="text-dimmed group-hover:text-primary pointer-events-none absolute top-2 right-2 size-4 align-top transition-colors"></Icon>
                            <div class="overflow-hidden">
                                <div class="text-neutral text-[16px] font-bold">{{ linkCard.linkTitle }}</div>
                                <UTooltip arrow :text="linkCard.linkDesc" :ui="{ content: 'w-75 h-fit -ml-12', text: 'text-wrap' }">
                                    <template #content>
                                        <p>{{ linkCard.linkDesc }}</p>
                                    </template>
                                    <p class="text-neutral-muted truncate pt-1 text-[14px]">{{ linkCard.linkDesc }}</p>
                                </UTooltip>
                            </div>
                        </ULink>
                    </div>
                </div>
            </UCard>
        </template>
    </UPage>
</template>
