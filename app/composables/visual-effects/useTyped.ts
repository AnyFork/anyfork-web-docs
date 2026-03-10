import Typed from 'typed.js'
export const useTyped = (domRemark?: string) => {
    const app = useAppConfig()
    const dom: string = domRemark ? domRemark : '.typed'
    let typedObject: any
    const typedFunction = () => {
        typedObject = new Typed(dom, {
            //打印的字符串数组
            strings: app.website?.banner.typed.heroText,
            //打印速度
            typeSpeed: app.website?.banner.typed.backSpeed,
            //开始之前的延迟300毫秒
            startDelay: app.website?.banner.typed.startDelay,
            //退格速度
            backSpeed: app.website?.banner.typed.backSpeed,
            //是否循环
            loop: app.website?.banner.typed.loop,
            //是否跳过空格
            smartBackspace: app.website?.banner.typed.smartBackspace
        })
    }
    onMounted(() => {
        nextTick(() => {
            setTimeout(() => {
                const el = document.querySelector(dom)
                if (el) {
                    typedFunction()
                }
            }, 500)
        })
    })
    onUnmounted(() => {
        if (typedObject) {
            typedObject = null
        }
    })
    return { tagline: app.website?.banner.tagline }
}
