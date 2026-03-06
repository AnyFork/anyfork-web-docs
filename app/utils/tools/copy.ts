/**
 * 复制到粘贴板
 */
export const copyToClipboard = (text: string) => {
    const toast = useToast()
    if (navigator.clipboard) {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                toast.add({
                    title: '内容已复制到剪贴板',
                    icon: 'tabler:copy',
                    color: 'primary'
                })
            })
            .catch((_err) => {
                toast.add({
                    title: '复制失败',
                    icon: 'tabler:copy',
                    color: 'error'
                })
            })
    } else {
        // 对于不支持`navigator.clipboard`的旧浏览器，可以使用后备方法
        const dummy = document.createElement('textarea')
        document.body.appendChild(dummy)
        dummy.value = text
        dummy.select()
        document.execCommand('copy')
        document.body.removeChild(dummy)
        toast.add({
            title: '内容已复制到剪贴板',
            icon: 'tabler:copy',
            color: 'primary'
        })
    }
}
