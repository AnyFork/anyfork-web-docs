// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/content', '@nuxt/eslint', '@vueuse/nuxt', 'dayjs-nuxt', '@nuxtjs/device', '@nuxtjs/algolia'],
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
                { rel: 'stylesheet', type: 'text/css', href: 'https://gcore.jsdelivr.net/npm/aplayer@1.10.1/dist/APlayer.min.css' }
            ],
            htmlAttrs: {
                lang: 'zh-CN',
                dir: 'ltr'
            }
        }
    },
    css: ['~/assets/css/index.css'],
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
    content: {},
    ui: {
        //开启@nuxt/fonts模块,默认为true
        fonts: true,
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
        // 打包输出目录配置
        output: {
            //SSG打包后文件目录
            publicDir: 'dist'
        },
        // 通过cross-env动态设置预设
        preset: process.env.NITRO_PRESET
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
    //自定义字体
    fonts: {
        families: [
            { name: 'Public Sans', provider: 'google', global: true },
            { name: 'DM Sans', provider: 'google', global: true },
            { name: 'Geist', provider: 'google', global: true },
            { name: 'Inter', provider: 'google', global: true },
            { name: 'Poppins', provider: 'google', global: true },
            { name: 'Outfit', provider: 'google', global: true },
            { name: 'Raleway', provider: 'google', global: true }
        ]
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
