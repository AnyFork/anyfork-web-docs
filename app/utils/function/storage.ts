import type { RemovableRef, Serializer } from '@vueuse/core'
/**
 * localStorage封装工具
 * @param key key
 * @param initValue  默认值
 * @returns ref(localStorage)
 */
export const useWrapLocalStorage = <DataT>(key: string, initValue: MaybeRefOrGetter<DataT>): RemovableRef<DataT> => {
    return useLocalStorage<DataT>(key, initValue, {
        serializer: {
            read: (str: string) => decrypt<DataT>(str),
            write: (str: DataT) => {
                return encrypt<DataT>(str)
            }
        } as Serializer<DataT>
    })
}
