import type { AppConfigInput } from 'nuxt/schema'

export default defineAppConfig<AppConfigInput>({
    theme: {
        radius: 0.25,
        blackAsPrimary: false,
        icons: 'lucide',
        font: 'Public Sans'
    },
    ui: {
        colors: {
            primary: 'green',
            neutral: 'slate'
        },
        icons: {
            light: 'i-lucide-sun',
            dark: 'i-lucide-moon'
        }
    },
    toaster: {
        position: 'bottom-right',
        expand: true,
        duration: 5000
    },
    website: {
        header: {
            title: '小紫念沁',
            menu: [
                {
                    label: '文章',
                    to: '/'
                },
                {
                    label: '文档',
                    to: '/docs.html'
                },
                {
                    label: '分类',
                    to: '/article/category/search.html'
                },
                {
                    label: '标签',
                    to: '/article/tags/algolia.html'
                },
                {
                    label: '导航',
                    to: '/links.html'
                }
            ]
        },
        banner: {
            typed: {
                typeSpeed: 300,
                startDelay: 300,
                backSpeed: 500,
                loop: true,
                smartBackspace: true,
                heroText: ['滴水可以穿石，不是因为其力量^1000', '而是因为其坚韧不拔、锲而不舍']
            },
            tagline: '不要羡慕别人的精彩，走好自己的路就好，一份付出，一份收获，相信自己能行，并坚持到底。'
        },
        magic: {
            // 趣味标题
            dynamicTitle: {
                showIcon: 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/favicon.ico',
                showText: '(/≧▽≦/)咦！又好了！',
                hideIcon: 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/favicon.ico',
                hideText: '(●—●)喔哟，崩溃啦！',
                recoverTime: 2000
            },
            // 樱花特效
            sakura: {
                count: 10,
                image: 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250707211805026.svg',
                enabled: true,
                zIndex: 10000000
            }
        },
        footer: {
            copyright: `2022-${new Date().getFullYear()} 小紫念沁 版权所有`,
            email: 'anyfork@gmail.com',
            icpRecord: '陕ICP备2022010303号-1'
        }
    }
})
