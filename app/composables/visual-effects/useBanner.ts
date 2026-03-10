export const useBanner = () => {
    let fx: any = null
    const show = ref(false)
    const { isMobile } = useDevice()
    const height = computed(() => (isMobile ? 150 : 550))
    onMounted(() => {
        fx = new flux.slider('#banner', {
            autoplay: true,
            pagination: false,
            width: '100%',
            height: height.value,
            delay: 5000
        })
        show.value = true
    })
    onUnmounted(() => {
        if (fx) {
            fx.stop()
            fx = null
        }
    })
    return { show }
}
