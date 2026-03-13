<template>
    <div ref="el" :style="{ '--x': `${elementX}px`, '--y': `${elementY}px` }" class="background-gradient group relative mb-2 rounded-[calc(var(--ui-radius)*2)] before:absolute before:-inset-0.5 before:-z-1 before:hidden before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:rounded-[calc(var(--ui-radius)*2)] md:mb-5 md:p-0.5 md:hover:shadow-xl before:lg:block">
        <div v-if="article?.isTop" class="to-top absolute top-0 right-0.5 z-0 md:top-1 md:right-0.5">
            <UIcon name="icon-park-outline:to-top" class="size-4 text-white md:size-5"></UIcon>
        </div>
        <UCard :ui="ui">
            <NuxtLink :to="`/article/detail/${article?.articleId}`" target="_blank" class="absolute inset-0 border-none focus:outline-none"></NuxtLink>
            <div v-if="position == 'left'" class="md:flex md:gap-6">
                <div class="w-full md:flex md:w-70 md:grow-0">
                    <img :src="article?.articleThumb" loading="lazy" class="h-32.5 w-full rounded-[calc(var(--ui-radius)*2)] transition-transform duration-1000 md:h-32.5 md:w-70 md:animate-pulse md:group-hover:scale-105" />
                </div>
                <div class="w-full cursor-pointer overflow-hidden md:flex-1">
                    <UTooltip :text="article.title" arrow :content="{ side: 'top', sideOffset: 2 }" class="text-neutral hover:text-primary dark:hover:text-primary-400 relative z-49 my-1 line-clamp-2 block text-[15px] font-bold md:mt-0 md:mb-2.5 md:truncate md:text-[20px]">
                        <span> {{ article.title }} </span>
                    </UTooltip>
                    <div class="text-neutral-muted hover:text-neutral line-clamp-4 w-full text-[14px] md:text-[15px]">{{ excerpt }}</div>
                </div>
            </div>
            <div v-else class="flex flex-col-reverse md:mr-2 md:flex-row md:gap-6">
                <div class="w-full cursor-pointer overflow-hidden md:flex-1">
                    <UTooltip :text="article.title" arrow :content="{ side: 'top', sideOffset: 2 }" class="text-neutral hover:text-primary dark:hover:text-primary-400 relative z-49 my-1 line-clamp-2 block text-[15px] font-bold md:mt-0 md:mb-2.5 md:truncate md:text-[20px]">
                        <span>{{ article.title }}</span>
                    </UTooltip>
                    <div class="text-neutral-muted hover:text-neutral line-clamp-4 w-full text-[14px] md:text-[15px]">{{ excerpt }}</div>
                </div>
                <div class="w-full md:flex md:w-70 md:shrink-0 md:justify-end">
                    <img :src="article.articleThumb" loading="lazy" class="h-32.5 w-full rounded-[calc(var(--ui-radius)*2)] transition-transform duration-1000 md:h-32.5 md:w-70 md:animate-pulse md:group-hover:scale-105" />
                </div>
            </div>
            <template #footer>
                <div class="grid grid-cols-3 gap-1 md:flex md:justify-start md:gap-5">
                    <WebSiteBlogExtra v-if="article?.categoryInfo?.name" icon-name="wordpress:category" :text="article?.categoryInfo?.name" :to="`/article/category/${article.categoryInfo.symbol}`"> </WebSiteBlogExtra>
                    <WebSiteBlogExtra v-if="article?.tagInfo && article?.tagInfo.length > 0" icon-name="fluent:tag-lock-20-regular" :text="article?.tagInfo[0]?.name!" :to="`/article/tags/${article.tagInfo[0]?.symbol}`" class="hidden md:flex"> </WebSiteBlogExtra>
                    <WebSiteBlogExtra v-if="article.createDate" icon-name="solar:calendar-line-duotone" :text="article.createDate"> </WebSiteBlogExtra>
                    <WebSiteBlogExtra icon-name="system-uicons:book" :text="article.wordCount + '字'"> </WebSiteBlogExtra>
                    <WebSiteBlogExtra icon-name="material-symbols-light:hourglass-outline-rounded" :text="article.readingTime + '分钟'"> </WebSiteBlogExtra>
                    <div class="text-neutral-muted hover:text-neutral flex cursor-pointer items-center gap-1">
                        <UIcon name="boxicons:hot" />
                        <div class="waline-pageview-count"></div>
                    </div>
                </div>
            </template>
        </UCard>
    </div>
</template>

<script setup lang="ts">
    import type { BlogCollectionItem } from '@nuxt/content'
    import type { CardProps } from '@nuxt/ui'
    import { pageviewCount } from '@waline/client'
    const { article } = defineProps<{ article: BlogCollectionItem; position: 'left' | 'right' }>()
    const el = ref<HTMLDivElement>()
    const { elementX, elementY } = useSharedMouseInElement(el)
    const ui: CardProps['ui'] = {
        root: 'bg-muted  hover:bg-(--ui-bg-accented)/50 dark:hover:bg-(--ui-bg-accented)/50 transition-[background-opacity]',
        body: 'relative px-2 py-4 sm:px-4 sm:py-3',
        footer: 'px-4 md:py-2 py-1 sm:px-6'
    }
    const excerpt = computed(() => {
        if (article.excerpt.value) {
            if (article.excerpt.value[0]) {
                return article.excerpt.value[0][2]
            }
        }
        return ''
    })
    onMounted(() => {
        pageviewCount({
            serverURL: 'https://waline.anyfork.top',
            path: `/article/detail/${article.articleId}`,
            update: false
        })
    })
</script>

<style scoped>
    .background-gradient:hover::before {
        background: radial-gradient(250px circle at var(--x) var(--y), var(--ui-primary) 0%, transparent 100%);
        will-change: background;
    }

    @media (width >= 768px) {
        .to-top::before {
            position: absolute;
            left: -15px;
            z-index: -10;
            width: 0;
            height: 0;
            content: '';
            border-top: 35px solid var(--ui-primary);
            border-left: 35px solid transparent;
            border-top-right-radius: 5px;
        }
    }

    .to-top::before {
        position: absolute;
        left: -12px;
        z-index: -10;
        width: 0;
        height: 0;
        content: '';
        border-top: 30px solid var(--ui-primary);
        border-left: 30px solid transparent;
        border-top-right-radius: 5px;
    }
</style>
