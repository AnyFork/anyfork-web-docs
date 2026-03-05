// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    modules: ['@nuxt/ui', '@nuxt/eslint'],
    ui: {
        fonts: false
    },
    //eslint配置项 @see https://eslint.nuxt.com/packages/module;
    eslint: {
        config: {
            configFile: 'nuxt.config.ts'
        },
        checker: {
            eslintPath: 'eslint',
            cache: true
        }
    },
    css: ['~/assets/css/index.css'],
    devtools: { enabled: true },
    compatibilityDate: '2024-04-03',
    //设置开发环境访问地址和端口
    devServer: {
        host: '0.0.0.0',
        port: 9527
    }
})
