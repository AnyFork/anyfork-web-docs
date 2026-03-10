import type * as ui from '#build/ui'
import type { DeepPartial } from '#ui/types/utils'
import type { ThemeIcons } from '@/utils/theme.ts'
import type { NavigationMenuItem } from '@nuxt/ui'
import type { defaultConfig } from 'tailwind-variants'
import type colors from 'tailwindcss/colors'

/** 图标名称与图标类名的映射类型 */
export type IconMap = typeof _icons

/** Tailwind 中性色类型（排除特殊值） */
export type NeutralColor = 'slate' | 'gray' | 'zinc' | 'neutral' | 'stone' | 'taupe' | 'mauve' | 'mist' | 'olive'

/** Tailwind 主题色类型（排除中性色/特殊值） */
export type ThemeColor = Exclude<keyof typeof colors, 'inherit' | 'current' | 'transparent' | 'black' | 'white' | NeutralColor>

/** 网站魔法特效配置 */
interface WebsiteMagicConfig {
    /** 动态标题特效配置 */
    dynamicTitle: {
        /** 展示状态下的图标类名 */
        showIcon: string
        /** 展示状态下的文本内容 */
        showText: string
        /** 隐藏状态下的图标类名 */
        hideIcon: string
        /** 隐藏状态下的文本内容 */
        hideText: string
        /** 特效恢复默认状态的时长(ms) */
        recoverTime: number
    }
    /** 樱花飘落特效配置 */
    sakura: {
        /** 樱花元素数量 */
        count: number
        /** 樱花图片地址 */
        image: string
        /** 是否启用樱花特效 */
        enabled: boolean
        /** 樱花特效的 z-index 层级 */
        zIndex: number
    }
}

/** Banner 区域配置 */
interface WebsiteBannerConfig {
    /** 打字机特效配置 */
    typed: {
        /** 打字速度(ms/字符) */
        typeSpeed: number
        /** 开始延迟时间(ms) */
        startDelay: number
        /** 回退删除速度(ms/字符) */
        backSpeed: number
        /** 是否循环播放 */
        loop: boolean
        /** 是否智能跳过空格 */
        smartBackspace: boolean
        /** 打字机展示的文本列表 */
        heroText: string[]
    }
    /** Banner 副标题 */
    tagline: string
}

/** 页脚配置 */
interface WebsiteFooterConfig {
    /** 页脚菜单导航 */
    menu?: NavigationMenuItem[] | NavigationMenuItem[][]
    /** 版权信息文本 */
    copyright?: string
    /** 联系邮箱 */
    email: string
    /** 网站ICP备案号 */
    icpRecord: string
}

/** 头部导航配置 */
interface WebsiteHeaderConfig {
    /** 头部标题 */
    title?: string
    /** 顶部导航菜单 */
    menu?: NavigationMenuItem[] | NavigationMenuItem[][]
}

//核心图标常量（语义化命名）
const _icons = {
    arrowLeft: 'i-lucide-arrow-left',
    arrowRight: 'i-lucide-arrow-right',
    check: 'i-lucide-check',
    chevronDoubleLeft: 'i-lucide-chevrons-left',
    chevronDoubleRight: 'i-lucide-chevrons-right',
    chevronDown: 'i-lucide-chevron-down',
    chevronLeft: 'i-lucide-chevron-left',
    chevronRight: 'i-lucide-chevron-right',
    chevronUp: 'i-lucide-chevron-up',
    close: 'i-lucide-x',
    ellipsis: 'i-lucide-ellipsis',
    external: 'i-lucide-arrow-up-right',
    loading: 'i-lucide-refresh-cw',
    minus: 'i-lucide-minus',
    plus: 'i-lucide-plus',
    search: 'i-lucide-search',
    light: 'i-lucide-sun',
    dark: 'i-lucide-moon'
} as const

// 扩展 Nuxt AppConfig 类型
declare module 'nuxt/schema' {
    /** 自定义 AppConfig 输入类型（用于配置项定义） */
    interface AppConfigInput {
        /** 全局提示框配置 */
        toaster?: ToasterProps
        /** 主题基础配置 */
        theme: {
            /** 圆角大小(px) */
            radius: number
            /** 是否将黑色作为主色调 */
            blackAsPrimary: boolean
            /**
             * 图标类型
             */
            icons: ThemeIcons
            /**
             * 字体类型
             */
            font: string
        }
        /** UI组件库配置 */
        ui: {
            /** 颜色体系配置 */
            colors: {
                /** 主色调 */
                primary?: ThemeColor
                /** 中性色 */
                neutral?: NeutralColor
            }
            /** 图标覆盖配置 */
            icons?: Partial<IconMap>
            /** tailwind-variants 配置 */
            tv?: typeof defaultConfig
        } & DeepPartial<typeof ui>
        /** 网站全局配置 */
        website?: {
            /** 头部配置 */
            header?: WebsiteHeaderConfig
            /** 特效配置 */
            magic: WebsiteMagicConfig
            /** Banner 配置 */
            banner: WebsiteBannerConfig
            /** 页脚配置 */
            footer?: WebsiteFooterConfig
        }
    }

    /** 自定义 AppConfig 类型（与输入类型保持一致） */
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface AppConfig extends AppConfigInput {}
}

export {}
