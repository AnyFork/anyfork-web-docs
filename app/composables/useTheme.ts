import { omit } from '#ui/utils'
import { themeIcons } from '@/utils/theme'
import type { SelectItem } from '@nuxt/ui'
import colors from 'tailwindcss/colors'

export function useTheme() {
    const appConfig = useAppConfig()
    //当前主题色cookies,默认存储7天，初始值为appConfig.ui?.colors?.primary
    const primaryColorCookies = usePrimaryColorCookies<string | undefined>(7, appConfig.ui?.colors?.primary)
    //文本颜色值
    const neutralColors = ['slate', 'gray', 'zinc', 'neutral', 'stone', 'taupe', 'mauve', 'mist', 'olive'] as const
    const neutral = computed({
        get() {
            return appConfig.ui.colors.neutral || 'slate'
        },
        set(option) {
            appConfig.ui.colors.neutral = option
            window.localStorage.setItem('nuxt-ui-neutral', appConfig.ui.colors.neutral!)
        }
    })
    const colorsToOmit = ['inherit', 'current', 'transparent', 'black', 'white', ...neutralColors] as const
    //主题色值
    const primaryColors = Object.keys(omit(colors, [...colorsToOmit])) as Array<Exclude<keyof typeof colors, (typeof colorsToOmit)[number]>>
    const primary = computed({
        get() {
            return appConfig.ui.colors.primary
        },
        set(option) {
            primaryColorCookies.value = option
            appConfig.ui.colors.primary = option
            window.localStorage.setItem('nuxt-ui-primary', appConfig.ui.colors.primary!)
            setBlackAsPrimary(false)
        }
    })
    //radius值
    const radiuses = [0, 0.125, 0.25, 0.375, 0.5]
    const radius = computed({
        get() {
            return appConfig.theme?.radius
        },
        set(option) {
            appConfig.theme.radius = option
            window.localStorage.setItem('nuxt-ui-radius', String(appConfig.theme.radius))
        }
    })
    //字体值
    const fonts = ref<SelectItem[]>([
        {
            label: '方正筑紫圆体',
            value: 'warick'
        },
        {
            label: '阿里妈妈方圆体',
            value: 'alifangyuan'
        },
        {
            label: '鸿蒙黑体 SC 常规体',
            value: 'HarmonyOS Sans SC'
        }
    ])
    const font = computed({
        get() {
            return appConfig.theme?.font
        },
        set(option) {
            appConfig.theme!.font = option
            window.localStorage.setItem('nuxt-ui-font', appConfig.theme!.font!)
        }
    })
    //图标值
    const icons = [
        {
            label: 'Lucide',
            icon: 'i-lucide-feather',
            value: 'lucide'
        },
        {
            label: 'Phosphor',
            icon: 'i-ph-phosphor-logo',
            value: 'phosphor'
        },
        {
            label: 'Tabler',
            icon: 'i-tabler-brand-tabler',
            value: 'tabler'
        }
    ]
    const icon = computed({
        get() {
            return appConfig.theme?.icons
        },
        set(option) {
            appConfig.theme!.icons = option
            appConfig.ui.icons = themeIcons[option] as any
            window.localStorage.setItem('nuxt-ui-icons', appConfig.theme!.icons!)
        }
    })
    /**
     * 是否将black颜色加入主题色
     * @param value
     */
    const setBlackAsPrimary = (value: boolean) => {
        appConfig.theme!.blackAsPrimary = value
        window.localStorage.setItem('nuxt-ui-black-as-primary', String(value))
    }

    /**
     * 重置主题
     */
    const resetTheme = () => {
        appConfig.ui.colors.primary = 'green'
        window.localStorage.removeItem('nuxt-ui-primary')

        appConfig.ui.colors.neutral = 'slate'
        window.localStorage.removeItem('nuxt-ui-neutral')

        appConfig.theme.radius = 0.25
        window.localStorage.removeItem('nuxt-ui-radius')

        appConfig.theme.font = 'Public Sans'
        window.localStorage.removeItem('nuxt-ui-font')

        appConfig.theme.icons = 'lucide'
        appConfig.ui.icons = themeIcons.lucide as any
        window.localStorage.removeItem('nuxt-ui-icons')

        appConfig.theme.blackAsPrimary = false
        window.localStorage.removeItem('nuxt-ui-black-as-primary')
    }

    return {
        neutralColors,
        neutral,
        primaryColors,
        primary,
        setBlackAsPrimary,
        radiuses,
        radius,
        fonts,
        font,
        icon,
        icons,
        resetTheme
    }
}
