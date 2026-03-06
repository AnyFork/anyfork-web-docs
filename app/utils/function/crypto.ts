import CryptoJS from 'crypto-js'

// 加密秘钥
const CryptoSecret = 'anyfork-web-docs'

/**
 * 加密数据,开发环境不加密
 * @param data - 数据
 */
export const encrypt = <T>(data: T): string => {
    let newData: string = ''
    if (typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean') {
        newData = data.toString()
    }
    if (typeof data === 'object') {
        newData = JSON.stringify(data)
    }
    return CryptoJS.AES.encrypt(newData, CryptoSecret).toString()
}

/**
 * 解密数据
 * @param cipherText - 密文
 */
export const decrypt = <T>(cipherText: string): T => {
    const bytes = CryptoJS.AES.decrypt(cipherText as string, CryptoSecret)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    try {
        return JSON.parse(originalText) as T
    } catch {
        return originalText as T
    }
}
