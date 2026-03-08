// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/eslint', '@vueuse/nuxt', 'dayjs-nuxt', '@nuxtjs/device', '@nuxtjs/algolia'],
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
                { name: 'description', content: '一款基于SpringBoot3服务端框架,Nuxt4.X,Vue3.X,Nuxt UI Pro,TailwindCSS 4.X和TypeScript前端框架开发的,Vite构建的,内容采用markdown语法编写的个人CMS系统，记录日常工作中的技术文档和工作心得。' },
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
                { rel: 'stylesheet', type: 'text/css', href: 'https://gcore.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css' }
            ],
            htmlAttrs: {
                lang: 'zh-CN',
                dir: 'ltr'
            }
        }
    },
    css: ['~/assets/css/index.css'],
    // // @nuxtjs/color-mode 配置，参考：https://color-mode.nuxtjs.org/#configuration
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
    ui: {
        //开启@nuxt/fonts模块,默认为true
        fonts: false,
        //开启@nuxt/color-mode模块,默认为true
        colorMode: true
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
            open: true
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
        preset: 'cloudflare_pages'
    },
    vite: {
        vue: {
            template: {
                compilerOptions: {
                    //设置自定义元素，返回true，vue不会进行组件解析,此处设置meting-js为自定义组件
                    isCustomElement: (tag: string) => ['meting-js'].includes(tag)
                }
            }
        }
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
        // 图标从远程服务器`Iconify API`发出请求获取
        serverBundle: {
            remote: 'jsdelivr'
        },
        // 当请求本地包中不存在的图标时，它将回退到请求官方`Iconify API`
        fallbackToApi: true,
        // 自定义本地SVG文件icon图标集合
        customCollections: [
            {
                prefix: 'anyfork',
                dir: './app/assets/icons'
            }
        ],
        // 拉取图标时超时时间
        fetchTimeout: 3000,
        // icon渲染模式，采用css类进行渲染
        mode: 'css',
        // css layer名称
        cssLayer: 'base'
    }
})
