/**
 * v-waterMarker可接收参数，均为非必填
 * { text: 'vue-admin-box', font: '16px Microsoft JhengHei', textColor: '#000' }
 */
import type { Directive, DirectiveBinding } from 'vue'
/**
 * 自定义DOM水印
 */
const directive: Directive = {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
        //给非Img标签添加水印，img标签使用v-img指令,两者者不可同用
        if (el.nodeName != 'IMG') {
            const can = document.createElement('canvas') as HTMLCanvasElement
            can.width = 384
            can.height = 384
            const cans = can.getContext('2d') as CanvasRenderingContext2D
            cans.translate(0, 0)
            cans.rotate(-30 * (Math.PI / 180))
            cans.font = binding.value.font || '16px Microsoft JhengHei'
            cans.fillStyle = binding.value.textColor || 'rgba(180, 180, 180, 0.6)'
            cans.textAlign = 'left'
            cans.textBaseline = 'middle'
            cans.fillText(binding.value.text || '小紫念沁', -12, 76)
            el.style.backgroundImage = 'url(' + can.toDataURL('image/webp') + ')' + ',' + 'url(' + can.toDataURL('image/webp') + ')'
        }
    }
}

export default directive
