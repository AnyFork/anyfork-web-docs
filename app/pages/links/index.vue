<script setup lang="ts">
    definePageMeta({ layout: 'blank' })
    const linkCategoryCmp = computed(() => {
        if (linkCategory) {
            expandTree(linkCategory as any)
            return linkCategory
        }
        return []
    })
    const breadcrumb = ref([
        {
            label: '首页',
            icon: 'i-lucide-house',
            to: '/'
        },
        {
            label: '快捷导航',
            icon: 'solar:link-square-broken'
        }
    ])
</script>
<template>
    <div class="w-full">
        <UBreadcrumb :items="breadcrumb" class="pb-2 pl-1 md:pb-4 md:pl-0" />
        <UPage :ui="{ left: 'lg:col-span-2', center: 'lg:col-span-8' }">
            <template v-if="linkCategory && linkCategory.length > 0" #left>
                <UPageAside class="dark:bg-muted border-default md:ring-default block h-fit rounded-[calc(var(--ui-radius)*2)] border py-2 md:border-0 md:ring lg:top-[calc(var(--ui-header-height)+20px)] lg:py-4 lg:pe-4">
                    <UTree :items="linkCategoryCmp" label-key="dictName">
                        <template #item-leading="{ item }">
                            <Icon v-if="item?.dictIcon" :name="item?.dictIcon" class="size-5 shrink-0" />
                        </template>
                        <template #item-label="{ item }">
                            <a v-if="item.children == undefined" :href="`#${item.dictId}`">{{ item.dictName }}</a>
                        </template>
                    </UTree>
                </UPageAside>
            </template>
            <UPageBody v-if="linkArray && linkArray.length > 0" class="border-default md:ring-default mt-2 space-y-1 rounded-[calc(var(--ui-radius)*2)] border p-2 md:mt-0 md:border-0 md:p-4 md:ring">
                <div v-for="(link, idx) in linkArray" :id="`${link.dictId}`" :key="'link-category' + idx">
                    <div v-if="link.linkInfo && link.linkInfo.length > 0" class="flex items-center py-2 text-[18px] font-bold">
                        <UIcon v-if="link?.dictIcon" :name="link.dictIcon" class="size-5" />
                        <span>{{ link.dictName }}</span>
                    </div>
                    <div v-if="link.linkInfo && link.linkInfo.length > 0" class="flex flex-col gap-4 md:grid md:grid-cols-3">
                        <ULink v-for="(linkCard, index) in link?.linkInfo" :key="'link-item' + index" :to="linkCard.linkHref" target="_blank" class="group dark:bg-muted border-default bg-default hover:bg-primary/10 hover:border-primary relative flex items-center gap-x-3 rounded-[calc(var(--ui-radius)*2)] border px-2.5 py-4 transition-colors">
                            <AvatarItem v-if="linkCard.linkIcon" :img="linkCard.linkIcon" class="size-10" />
                            <Icon name="i-lucide:arrow-up-right" class="text-dimmed group-hover:text-primary pointer-events-none absolute top-2 right-2 size-4 align-top transition-colors"></Icon>
                            <div class="overflow-hidden">
                                <div class="text-neutral text-[16px] font-bold">{{ linkCard.linkTitle }}</div>
                                <UTooltip arrow :text="linkCard.linkDesc" :ui="{ content: 'w-75 h-fit -ml-12', text: 'text-wrap' }">
                                    <template #content>
                                        <p>{{ linkCard.linkDesc }}</p>
                                    </template>
                                    <p class="text-neutral-muted line-clamp-2 pt-1 text-[14px]">{{ linkCard.linkDesc }}</p>
                                </UTooltip>
                            </div>
                        </ULink>
                    </div>
                </div>
            </UPageBody>
        </UPage>
    </div>
</template>
