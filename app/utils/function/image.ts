/**
 * 监听图片加载
 * @param url 图片地址
 * @param callBack 回调对象
 */
const useLoadImage = (url: string, callBack: (image: HTMLImageElement) => void) => {
    // 创建一个Image对象用于加载原始图片和水印图片
    const originalImage = new Image()
    //关键，防止canvas跨域污染
    originalImage.setAttribute('crossOrigin', 'anonymous')
    originalImage.src = url
    // 监听原始图片加载完成事件
    originalImage.onload = () => {
        callBack(originalImage)
    }
}

/**
 * 将DataURL转换为Blob对象
 * @param dataURL DataUR数据
 * @returns blog对象
 */
const useDataURLtoBlob = (dataURL: string) => {
    const arr = dataURL.split(',') as Array<any>
    const mime = arr[0]?.match(/:(.*?);/)[1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
}

const useWaterMarkerToImg = (imgSrc: string, text?: string, blob?: boolean, font?: string, textColor?: string) => {
    return new Promise<string>((resolve, reject) => {
        //创建图片对象
        const image = new Image()
        //设置图片跨域
        image.setAttribute('crossOrigin', 'anonymous')
        //设置图片地址
        image.src = imgSrc
        //图片加载完
        image.onload = () => {
            try {
                // 创建一个canvas元素
                const canvas = document.createElement('canvas') as HTMLCanvasElement
                // 设置canvas宽高为原始图片大小
                canvas.width = image.width
                canvas.height = image.height
                //获取canvas上下文
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
                ctx.translate(0, 0)
                let fontSize = null
                //根据不同图片的宽度设置不同的水印字体大小
                if (image.width > 1000) {
                    fontSize = 100
                } else if (image.width < 1000 && image.width > 500) {
                    fontSize = 50
                } else {
                    fontSize = 40
                }
                // 绘制水印文本字体样式
                ctx.font = font || `italic ${fontSize}px Microsoft YaHei`
                // 设置填充样式，颜色和字体
                ctx.fillStyle = textColor || 'rgba(180, 180, 180, 0.6)'
                // 设置文本垂直的对齐方式
                ctx.textBaseline = 'middle'
                // 设置文本的水平对齐方式
                ctx.textAlign = 'left'
                //将canvas中的内容绘制到图片上
                ctx.drawImage(image, 0, 0)
                // 设置文本旋转角度
                ctx.rotate((-10 * Math.PI) / 180)
                // 设置水印文本
                ctx.fillText(text || '小紫念沁', canvas.width / 10, canvas.height / 3)
                ctx.fillText(text || '小紫念沁', canvas.width / 2, canvas.height)
                ctx.fillText(text || '小紫念沁', 0, 0)
                // 将canvas转换为DataURL
                const waterMarkerImageUrl = canvas.toDataURL('image/webp')
                //是否需要将图片转为blob格式
                const imageSrc = blob ? URL.createObjectURL(useDataURLtoBlob(waterMarkerImageUrl)) : waterMarkerImageUrl
                resolve(imageSrc)
            } catch (e) {
                reject(e)
            }
        }
    })
}

/**
 * 将图片转为dataUrl数据
 * @param imgSrc 图片地址
 * @returns dataUrl数据
 */
const useImgSrcToDataUrl = (imgSrc: string) => {
    return new Promise<string>((resolve, reject) => {
        //创建图片对象
        const image = new Image()
        //设置图片跨域
        image.setAttribute('crossOrigin', 'anonymous')
        //设置图片地址
        image.src = imgSrc
        //图片加载完
        image.onload = () => {
            try {
                // 创建一个canvas元素
                const canvas = document.createElement('canvas') as HTMLCanvasElement
                // 设置canvas宽高为原始图片大小
                canvas.width = image.width
                canvas.height = image.height
                //获取canvas上下文
                const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
                //将canvas中的内容绘制到图片上
                ctx.drawImage(image, 0, 0)
                // 将canvas转换为DataURL
                const waterMarkerImageUrl = canvas.toDataURL('image/webp')
                resolve(waterMarkerImageUrl)
            } catch (e) {
                reject(e)
            }
        }
    })
}

/**
 * 将图片转换为blob格式
 * @param imgSrc 图片url
 */
const useImgSrcToBlobUrl = async (imgSrc: string) => {
    //获取图片的dataUrl
    const dataUrl = await useImgSrcToDataUrl(imgSrc)
    //将dataUrl转成blogUrl
    return URL.createObjectURL(useDataURLtoBlob(dataUrl))
}

export { useImgSrcToBlobUrl, useLoadImage, useWaterMarkerToImg }
