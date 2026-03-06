import directive from '~/directive'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(directive)
})
