import type { App, Directive } from 'vue'
import focus from './modules/focus'
import img from './modules/lazyImg'
import loading from './modules/loading/index'
import waterMarker from './modules/waterMarker'
const directivesList: Record<string, Directive> = {
    // 水印指令
    waterMarker,
    // focus指令
    focus,
    //图片指令
    img,
    //loading指令
    loading
}
const directives = {
    install: function (app: App<Element>) {
        Object.keys(directivesList).forEach((key) => {
            // 注册自定义指令
            app.directive(key, directivesList[key]!)
        })
    }
}
export default directives
