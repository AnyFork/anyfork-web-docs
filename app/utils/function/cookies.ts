import type { CookieRef } from '#app'
import type { ManipulateType } from 'dayjs'

/**
 * useCookie包装方法
 * @param storeKey cookies的key
 * @param maxExpireDay 过期时间
 * @param unit 时间单位
 * @param defaultValue 默认值
 * @returns
 */
export const useWrapCookies = <T>(storeKey: string, unit?: ManipulateType, maxExpireTime?: number, defaultValue?: T): CookieRef<T> => {
    if (maxExpireTime) {
        if (!maxExpireTime || !Number.isInteger(maxExpireTime) || maxExpireTime < 0) {
            throw new Error('maxExpireDay must be a positive integer')
        }
        const dayjs = useDayjs()
        const date = dayjs().add(maxExpireTime, unit)
        if (defaultValue) {
            return useCookie<T>(storeKey, { expires: dayjs(date).toDate(), default: () => defaultValue, decode: (value) => decrypt<T>(value), encode: (value) => encrypt<T>(value) })
        } else {
            return useCookie<T>(storeKey, { expires: dayjs(date).toDate(), decode: (value) => decrypt<T>(value), encode: (value) => encrypt<T>(value) })
        }
    } else {
        if (defaultValue) {
            return useCookie<T>(storeKey, { default: () => defaultValue, decode: (value) => decrypt<T>(value), encode: (value) => encrypt<T>(value) })
        }
        return useCookie<T>(storeKey, { decode: (value) => decrypt<T>(value), encode: (value) => encrypt<T>(value) })
    }
}

/**
 * 主题色primaryColor
 * @param maxExpireTime 过期时间，单位天
 * @param defaultValue 默认值
 * @returns
 */
export const usePrimaryColorCookies = <T>(maxExpireTime?: number, defaultValue?: T): CookieRef<T> => {
    return useWrapCookies(CookieKeyType.NUXT_PRIMARY_COLOR, 'day', maxExpireTime, defaultValue)
}
