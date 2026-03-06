import type { ContentNavigationLink } from '@nuxt/ui/runtime/components/content/ContentNavigation.vue.js'
import type { admin } from '~/types/api'

/**
 * 树形结构扁平化
 * @param tree 树形数据
 * @param dataKey 数据key
 * @returns 扁平化结构数据
 */
export const flattenTree = <T extends { children?: T[] }>(tree: T[], dataKey: string): Omit<T, 'children'>[] => {
    return tree.reduce((acc: Omit<T, 'children'>[], node) => {
        const { children, ...rest } = node
        if (children && children.length > 0) {
            if (Object.keys(rest).includes(dataKey)) {
                return acc.concat([rest], flattenTree(children, dataKey))
            } else {
                return acc.concat(flattenTree(children, dataKey))
            }
        } else {
            if (Object.keys(rest).includes(dataKey)) {
                return acc.concat([rest])
            }
            return []
        }
    }, [])
}

/**
 * 树形结构父节点展开处理
 * @param tree 树形数据
 * @returns 树形结构
 */
export const expandTree = <T extends { children?: T[]; defaultExpanded?: boolean }>(tree: T[]): void => {
    tree.map((item) => {
        if (item.children && item.children.length > 0) {
            item.defaultExpanded = true
            expandTree(item.children)
        } else {
            item.defaultExpanded = false
        }
    })
}

/**
 * 管理后台将文档文章树形结构的数据转换为ContentNavigationLink类型
 * @param tree admin.docArticle[]
 * @returns ContentNavigationLink[]
 */
export const transformDataContentNavigation = (tree: admin.docArticle[]): ContentNavigationLink[] => {
    return tree.map((item) => {
        const { docArticleTitle, docArticleId, docArticleAlias, docId, docArticleLogo, docArticlePid, isDeleted } = item
        if (item.children && item.children.length > 0) {
            return { title: docArticlePid == '0' ? docArticleTitle : docArticleAlias, icon: docArticleLogo ?? undefined, children: transformDataContentNavigation(item.children) }
        } else {
            return { title: docArticlePid == '0' ? docArticleTitle : docArticleAlias, icon: docArticleLogo ?? undefined, path: docArticleTitle ? `/admin/dashboard/blog/docs/article/${docId}/${docArticleId}.html?isDeleted=${isDeleted}` : undefined, children: [] }
        }
    })
}

/**
 * 网站将文档文章树形结构的数据转换为ContentNavigationLink类型
 * @param tree admin.docArticle[]
 * @returns ContentNavigationLink[]
 */
export const transformWebDataContentNavigation = (tree: admin.docArticle[], docAlias: string): ContentNavigationLink[] => {
    return tree.map((item) => {
        const { docArticleTitle, docArticleId, docArticleAlias, docArticleLogo, docArticlePid } = item
        if (item.children && item.children.length > 0) {
            return { title: docArticlePid == '0' ? docArticleTitle : docArticleAlias, icon: docArticleLogo ?? undefined, children: transformWebDataContentNavigation(item.children, docAlias) }
        } else {
            return { title: docArticlePid == '0' ? docArticleTitle : docArticleAlias, icon: docArticleLogo ?? undefined, path: docArticleTitle ? `/docs/${docAlias}/${docArticleId}.html` : undefined, children: [] }
        }
    })
}
