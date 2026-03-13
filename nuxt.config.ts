import { getCategory } from './app/utils/data/category'
import { getTags } from './app/utils/data/tag'
import { calculateContentStats } from './app/utils/tools/blog'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/eslint', '@vueuse/nuxt', 'dayjs-nuxt', '@nuxtjs/device', '@nuxtjs/algolia', 'nuxt-svgo'],
    ssr: true,
    //自定义组件前缀，禁止路径前缀
    components: [
        // 网站组件采用WebSite前缀
        { path: 'components/website', prefix: 'WebSite', pathPrefix: false },
        // 通用组件无前缀
        { path: 'components/common', prefix: '', pathPrefix: false }
    ],
    // 自定义自定义导入目录
    imports: {
        dirs: ['composables/**', 'utils/**']
    },
    devtools: { enabled: true },
    app: {
        baseURL: '/',
        head: {
            title: '小紫念沁的博客',
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width,initial-scale=1.0' },
                { name: 'description', content: '基于 Nuxt4、Nuxt UI 4、Nuxt Content 及 TypeScript 构建个人博客文档系统，采用 Markdown 编写技术文档与工作心得。集成 ESLint、Prettier、stylelint 保障代码规范，结合 git 提交工具链实现提交规范约束与日志自动化生成，符合企业级开发标准。' },
                { name: 'type', content: 'website' },
                { name: 'keywords', content: 'Java,SpringBoot,Vue,Nuxt,Vite,Nuxt UI Pro,TailwindCSS,CMS' },
                { name: 'author', content: 'anyfork@gmail.com' },
                //百度资源搜索平台资源认证。https://ziyuan.baidu.com/
                { name: 'baidu-site-verification', content: 'codeva-Br7DBbNpo0' }
            ],
            script: [
                //jquery js
                {
                    defer: true,
                    type: 'text/javascript',
                    src: 'https://gcore.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js'
                },
                //flux 3D图片动画特效
                {
                    defer: true,
                    type: 'text/javascript',
                    src: 'https://gcore.jsdelivr.net/gh/AnyFork/resource/js/flux.min.js'
                },
                //APlayer播放器js
                {
                    defer: true,
                    type: 'text/javascript',
                    src: 'https://gcore.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.js'
                },
                //metingJs
                {
                    defer: true,
                    type: 'text/javascript',
                    src: 'https://gcore.jsdelivr.net/npm/meting@2.0.1/dist/Meting.min.js'
                },
                //百度统计
                {
                    defer: true,
                    type: 'text/javascript',
                    src: 'https://hm.baidu.com/hm.js?c59208ce83c7e9dc117bb33076ff2bc7'
                }
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/favicon.ico' },
                { rel: 'stylesheet', type: 'text/css', href: 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/fonts/division/Warick/warick.css' },
                { rel: 'stylesheet', type: 'text/css', href: 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/fonts/division/AlimamaFangYuanTiVF/AlimamaFangYuanTiVF-Thin-2.css' },
                { rel: 'stylesheet', type: 'text/css', href: 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/fonts/division/HarmonyOS/HarmonyOS_Sans_SC/HarmonyOS_Sans_SC_Regular/HarmonyOS_Sans_SC_Regular.css' },
                { rel: 'stylesheet', type: 'text/css', href: 'https://gcore.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css' }
            ],
            htmlAttrs: {
                lang: 'zh-CN',
                dir: 'ltr'
            }
        }
    },
    css: ['~/assets/css/index.css'],
    router: {
        options: {
            strict: true
        }
    },
    // @nuxtjs/color-mode 配置，参考：https://color-mode.nuxtjs.org/#configuration
    colorMode: {
        //修改class默认后缀
        classSuffix: '',
        //修改默认$colorMode.preference=system为light
        preference: 'light',
        //存储方式
        storage: 'localStorage',
        //存储cookie名称
        storageKey: 'nuxt-color-mode'
    },
    //@nuxt/content配置，@see https://content.nuxt.com/docs/getting-started/configuration#markdown
    content: {
        build: {
            markdown: {
                toc: {
                    // 要包含在目录中的最大标题深度。depth:3表示包含h3
                    depth: 3,
                    //要搜索标题的嵌套标签的最大深度
                    searchDepth: 3
                }
            }
        }
    },
    ui: {
        //开启@nuxt/fonts模块,默认为true
        fonts: false,
        //开启@nuxt/color-mode模块,默认为true
        colorMode: true,
        //实验特性
        experimental: {
            //自动推断项目中使用了的组件css
            componentDetection: true
        }
    },
    runtimeConfig: {
        public: {
            // 评价服务端地址
            NUXT_COMMENT_BASE_URL: 'https://waline.anyfork.top'
        }
    },
    build: {
        //构建分析工具
        analyze: {
            //显示启用
            enabled: true,
            //生成stats.html可视化分析包构成
            analyzerMode: 'static',
            //构建完成后自动打开
            open: false
        }
    },
    sourcemap: process.env.NODE_ENV == 'development' ? true : false,
    //设置开发环境访问地址和端口
    devServer: {
        host: '0.0.0.0',
        port: 9527
    },
    compatibilityDate: '2024-04-03',
    nitro: {
        // 服务端开启gzip压缩,关闭brotli压缩
        compressPublicAssets: {
            // 启用Gzip压缩,生成.gz文件
            gzip: true,
            // 关闭brotli压缩
            brotli: false
        },
        // 打包输出目录配置
        output: {
            //SSG打包后文件目录
            publicDir: 'dist'
        },
        // 通过cross-env动态设置预设
        preset: process.env.NITRO_PRESET,
        prerender: {
            //禁用后路由/about直接生成 /about.html，而不是 /about/index.html
            autoSubfolderIndex: false,
            // 启用自动爬虫发现路由
            crawlLinks: true
            // routes: ['/article/category/search.html']
        }
    },
    vite: {
        vue: {
            template: {
                compilerOptions: {
                    //设置自定义元素，返回true，vue不会进行组件解析,此处设置meting-js为自定义组件
                    isCustomElement: (tag: string) => ['meting-js'].includes(tag)
                }
            }
        },
        esbuild: {
            sourcemap: process.env.NODE_ENV == 'development' ? true : false,
            // 移除console,debugger关键字
            drop: process.env.NODE_ENV == 'development' ? [] : ['console', 'debugger']
        },
        build: {
            minify: 'esbuild',
            //用于指定小于此阈值的资源文件（如图片、字体等）是否应内联到打包后的JavaScript文件中。默认情况下，所有小于4KB的资源文件会被内联为base64编码，以减少HTTP请求的数量‌
            assetsInlineLimit: 4096,
            chunkSizeWarningLimit: 5000,
            rollupOptions: {
                output: {
                    // 指定打包后的入口文件名规则
                    entryFileNames: '_nuxt/js/[name].[hash].js',
                    // 分包chunk碎片文件命名规则
                    chunkFileNames: '_nuxt/js/[name].[hash].js',
                    // 定义构建后的静态资源文件名
                    assetFileNames: '_nuxt/[ext]/[name].[hash].[ext]'
                }
            }
        }
    },
    hooks: {
        'content:file:afterParse'(ctx) {
            const { file, content } = ctx
            //统计markdown字数和阅读时间
            const wordsPerMinute = 180
            const text = typeof file.body === 'string' ? file.body : ''
            const { wordCount, readingTime } = calculateContentStats(text, wordsPerMinute)
            content.readingTime = readingTime
            content.wordCount = wordCount
            //获取markdown分类和标签
            const categoryId = content?.categoryId as number
            const tagIds = content?.tagIds as number[]
            if (categoryId) {
                content.categoryInfo = getCategory(categoryId as number)
            }
            if (tagIds && tagIds.length > 0) {
                content.tagInfo = getTags(tagIds)
            }
        }
        //重写路由规则，加上.html后缀
        // 'pages:extend'(pages) {
        //     pages.forEach((page) => {
        //         if (page.path !== '/') {
        //             page.path = `${page.path}.html`
        //         }
        //     })
        // }
    },
    //docSearch配置，参考文档：https://algolia.nuxtjs.org/advanced/docsearch
    algolia: {
        apiKey: '80f3f9f2e9287eb88686df5912a368f6',
        applicationId: 'OBYO5BJ5I3',
        docSearch: {
            indexName: 'anyforktop',
            lang: 'zh-CN'
        }
    },

    //eslint配置项 @see https://eslint.nuxt.com/packages/module;
    eslint: {
        checker: {
            eslintPath: 'eslint',
            cache: true
        }
    },
    // @nuxt/icon配置，参考：https://nuxt.com/modules/icon
    icon: {
        // 图标从iconify获取
        provider: 'iconify',
        serverBundle: false,
        // 拉取图标时超时时间
        fetchTimeout: 5000,
        // icon渲染模式，采用css类进行渲染
        mode: 'css',
        // css layer名称
        cssLayer: 'base'
    },
    svgo: {
        dts: true
    }
})
