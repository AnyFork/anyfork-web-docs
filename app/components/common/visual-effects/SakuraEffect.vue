<template>
    <div class="Sakura">
        <canvas id="canvas_sakura" ref="canvas_sakura" class="pointer-events-none fixed top-0 left-0" :style="{ zIndex: config.zIndex }"></canvas>
    </div>
</template>
<script setup>
    import colors from 'tailwindcss/colors'
    const colorMode = useColorMode()
    const app = useAppConfig()
    const primaryColorCookies = usePrimaryColorCookies(7, app.ui?.colors?.primary)
    const svgColor = computed(() => {
        if (app.theme.blackAsPrimary) {
            if (colorMode.value == 'dark') {
                return 'oklch(1 0 0)'
            } else {
                return 'oklch(0 0 0)'
            }
        }
        return colors[primaryColorCookies.value][600]
    })
    const canvas_sakura = useTemplateRef('canvas_sakura')
    const config = reactive({
        static: false,
        stop: null,
        num: app.website.magic.sakura.count,
        show: app.website.magic.sakura.enabled,
        zIndex: app.website.magic.sakura.zIndex
    })

    /**
     * 动态导入public下面的svg图片，并获取其内容,如果是网络图片则加载网络svg图片
     * @param {*} name 图片名称
     */
    const getSvgIcon = async (name) => {
        if (name.includes('https') || name.includes('http')) {
            const response = await fetch(name)
            return await response.text()
        }
        name = name.replace('.svg', '')
        const module = new URL(/* @vite-ignore */ import.meta.env.PROD ? `${name}.svg?href` : `../../../public${name}.svg`, import.meta.url).href
        const response = await fetch(module)
        return await response.text()
    }
    class Sakura {
        constructor(x, y, s, r, fn, img) {
            this.x = x
            this.y = y
            this.s = s
            this.r = r
            this.fn = fn
            this.img = img
        }
        draw(cxt) {
            cxt.save()
            cxt.translate(this.x, this.y)
            cxt.rotate(this.r)
            cxt.drawImage(this.img, 0, 0, 40 * this.s, 40 * this.s)
            cxt.restore()
        }
        update() {
            this.x = this.fn.x(this.x, this.y)
            this.y = this.fn.y(this.y, this.y)
            this.r = this.fn.r(this.r)
            if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
                this.r = getRandom('fnr')
                if (Math.random() > 0.4) {
                    this.x = getRandom('x')
                    this.y = 0
                    this.s = getRandom('s')
                    this.r = getRandom('r')
                } else {
                    this.x = window.innerWidth
                    this.y = getRandom('y')
                    this.s = getRandom('s')
                    this.r = getRandom('r')
                }
            }
        }
    }
    class SakuraList {
        constructor() {
            this.list = []
        }
        push(sakura) {
            this.list.push(sakura)
        }
        update() {
            for (let i = 0, len = this.list.length; i < len; i++) {
                this.list[i].update()
            }
        }
        draw(cxt) {
            for (let i = 0, len = this.list.length; i < len; i++) {
                this.list[i].draw(cxt)
            }
        }
        get(i) {
            return this.list[i]
        }
        size() {
            return this.list.length
        }
    }
    const getRandom = (option) => {
        let ret, random
        switch (option) {
            case 'x':
                ret = Math.random() * window.innerWidth
                break
            case 'y':
                ret = Math.random() * window.innerHeight
                break
            case 's':
                ret = Math.random()
                break
            case 'r':
                ret = Math.random() * 6
                break
            case 'fnx':
                random = -0.5 + Math.random() * 1
                ret = function (x, _y) {
                    return x + 0.5 * random - 1.7
                }
                break
            case 'fny':
                random = 1.5 + Math.random() * 0.7
                ret = function (x, y) {
                    return y + random
                }
                break
            case 'fnr':
                random = Math.random() * 0.03
                ret = function (r) {
                    return r + random
                }
                break
        }
        return ret
    }
    const startSakura = async () => {
        // eslint-disable-next-line no-global-assign
        requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame
        const canvas = document.getElementById('canvas_sakura')
        config.staticx = true
        canvas_sakura.value.width = window.innerWidth
        canvas_sakura.value.height = window.innerHeight
        const cxt = canvas_sakura.value.getContext('2d')
        const sakuraList = new SakuraList()
        const img = new Image()
        if (app.website.magic.sakura.image && app.website.magic.sakura.image.endsWith('.svg')) {
            const svgStr = await getSvgIcon(app.website.magic.sakura.image)
            img.src = `data:image/svg+xml;base64,${btoa(svgStr.replace('currentColor', svgColor.value))}`
        } else {
            img.src = app.website.magic.sakura.image || 'https://gcore.jsdelivr.net/gh/AnyFork/Resource/images/20250707213545085.png'
        }
        for (let i = 0; i < config.num; i++) {
            const randomX = getRandom('x')
            const randomY = getRandom('y')
            const randomR = getRandom('r')
            const randomS = getRandom('s')
            const randomFnx = getRandom('fnx')
            const randomFny = getRandom('fny')
            const randomFnR = getRandom('fnr')
            const sakura = new Sakura(
                randomX,
                randomY,
                randomS,
                randomR,
                {
                    x: randomFnx,
                    y: randomFny,
                    r: randomFnR
                },
                img
            )
            sakura.draw(cxt)
            sakuraList.push(sakura)
        }
        config.stop = requestAnimationFrame(function fn() {
            cxt.clearRect(0, 0, canvas.width, canvas.height)
            sakuraList.update()
            sakuraList.draw(cxt)
            config.stop = requestAnimationFrame(fn)
        })
    }
    watchEffect(() => {
        if (canvas_sakura.value) {
            if (app.theme.blackAsPrimary) {
                if (colorMode.value) {
                    if (config.show && app.website.magic.sakura.image && app.website.magic.sakura.image.endsWith('.svg')) {
                        nextTick(() => {
                            if (config.show) {
                                startSakura()
                            }
                        })
                    }
                }
            } else {
                if (primaryColorCookies.value) {
                    if (config.show && app.website.magic.sakura.image && app.website.magic.sakura.image.endsWith('.svg')) {
                        nextTick(() => {
                            startSakura()
                        })
                    }
                }
            }
        }
    })
</script>
