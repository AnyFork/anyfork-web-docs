/**
 * v-img可接收参数，图片地址，水印信息，图片地址是否blob显示
 * { imgSrc: string; waterMarker?: { text: string; font: string; textColor: string } | boolean; blob?: boolean; lazy?: boolean }
 */
import type { Directive, DirectiveBinding } from 'vue'
/**
 * 自定义图片指令
 */
const directive: Directive = {
    mounted(el: HTMLImageElement, binding: DirectiveBinding<{ imgSrc: string; waterMarker?: { text: string; font: string; textColor: string } | boolean; blob?: boolean; lazy?: boolean }>) {
        //解析指令参数
        const { imgSrc, waterMarker = true, blob = true, lazy = false } = binding.value
        //判断是否需要懒加载
        if (lazy) {
            const observer = new IntersectionObserver(async (entries) => {
                const [entry] = entries
                if (!entry) return
                const { isIntersecting } = entry
                // isIntersecting为true；进入可视区域，false：未进入可视区域
                if (isIntersecting) {
                    //如果需要加水印，给图片加水印
                    if (typeof waterMarker == 'boolean' && waterMarker) {
                        el.src = await useWaterMarkerToImg(imgSrc, undefined, blob)
                    } else if (typeof waterMarker == 'object' && waterMarker) {
                        const { text = '小紫念沁', font = '16px Microsoft JhengHei', textColor = 'rgba(180, 180, 180, 0.6)' } = waterMarker
                        el.src = await useWaterMarkerToImg(imgSrc, text, blob, font, textColor)
                    } else if (blob) {
                        //是否需要将图片转为blob格式
                        el.src = await useImgSrcToBlobUrl(imgSrc)
                    } else {
                        // 给图片的src属性赋值图片的地址
                        el.src = imgSrc
                    }
                    // 取消图片的监听，默认是会一直监听的，如果不取消。就会一直执行
                    observer.unobserve(el)
                }
            })
            // 监听dom元素
            observer.observe(el)
        } else {
            ;(async () => {
                //如果需要加水印，给图片加水印
                if (typeof waterMarker == 'boolean' && waterMarker) {
                    el.src = await useWaterMarkerToImg(imgSrc, undefined, blob)
                } else if (typeof waterMarker == 'object' && waterMarker) {
                    const { text = '小紫念沁', font = '16px Microsoft JhengHei', textColor = 'rgba(180, 180, 180, 0.6)' } = waterMarker
                    el.src = await useWaterMarkerToImg(imgSrc, text, blob, font, textColor)
                } else if (blob) {
                    //是否需要将图片转为blob格式
                    el.src = await useImgSrcToBlobUrl(imgSrc)
                } else {
                    // 给图片的src属性赋值图片的地址
                    el.src = imgSrc
                }
            })()
        }
    },
    unmounted(el, _binding, _vnode) {
        URL.revokeObjectURL(el.src)
    }
}
export default directive
