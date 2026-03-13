import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        //博客集合
        blog: defineCollection({
            type: 'page',
            source: 'blog/**/*.md',
            schema: z.object({
                createDate: z.iso.datetime(),
                updateDate: z.iso.datetime(),
                articleThumb: z.string(),
                tagIds: z.array(z.number()),
                categoryId: z.number(),
                articleId: z.bigint(),
                isTop: z.boolean(),
                excerpt: z.object({
                    type: z.string(),
                    value: z.array(z.array(z.string()))
                }),
                rawbody: z.string(),
                readingTime: z.number().optional(),
                wordCount: z.number().optional(),
                keywords: z.string(),
                categoryInfo: z.object({
                    name: z.string(),
                    icon: z.string(),
                    id: z.number(),
                    symbol: z.string()
                }),
                tagInfo: z.array(
                    z.object({
                        name: z.string(),
                        icon: z.string(),
                        id: z.number(),
                        symbol: z.string()
                    })
                ),
                isRecommend: z.boolean(),
                isHidden: z.boolean(),
                isHot: z.boolean()
            }),
            indexes: [
                {
                    columns: ['articleId'],
                    unique: true
                },
                {
                    columns: ['isRecommend', 'isHidden', 'isHot']
                }
            ]
        })
    }
})
