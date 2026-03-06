<template>
    <div class="FunnyTitle"></div>
</template>
<script setup>
    const route = useRoute()
    const app = useAppConfig()
    const config = reactive({
        originTitle: '',
        recoverTimeout: null,
        showIcon: app.website.magic.dynamicTitle.showIcon,
        showText: app.website.magic.dynamicTitle.showText,
        hideIcon: app.website.magic.dynamicTitle.hideIcon,
        hideText: app.website.magic.dynamicTitle.hideText,
        recoverTime: app.website.magic.dynamicTitle.recoverTime
    })
    const hidden = () => {
        if (config.hideIcon !== '') {
            getIconElm().setAttribute('href', config.hideIcon)
        }
        document.title = config.hideText
        clearTimeout(config.recoverTimeout)
    }
    const visible = () => {
        if (config.showIcon !== '') {
            getIconElm().setAttribute('href', config.showIcon)
        }
        document.title = config.showText + config.originTitle
        config.recoverTimeout = setTimeout(() => {
            document.title = config.originTitle
        }, config.recoverTime)
    }
    const getIconElm = () => {
        let elm = document.querySelector('link[rel=icon]')
        if (elm === null) {
            elm = document.createElement('link')
            elm.setAttribute('rel', 'icon')
            document.head.appendChild(elm)
        }
        return elm
    }
    onMounted(() => {
        config.originTitle = document.title
        if (config.showIcon !== '') {
            getIconElm().setAttribute('href', config.showIcon)
        }
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                hidden()
            } else {
                visible()
            }
        })
    })
    watch(route, (newValue, oldValue) => {
        if (newValue.path !== oldValue.path) {
            config.originTitle = document.title
            clearTimeout(config.recoverTimeout)
        }
    })
</script>
