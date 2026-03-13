export const category = [
    {
        name: '全文检索',
        symbol: 'search',
        icon: 'line-md:file-search',
        id: 1
    },
    {
        name: '黑苹果',
        symbol: 'apple',
        icon: 'ic:baseline-apple',
        id: 2
    },
    {
        name: '软件安装',
        symbol: 'software',
        icon: 'carbon:software-resource-cluster',
        id: 3
    },
    {
        name: 'CSS',
        symbol: 'css',
        icon: 'material-symbols:css',
        id: 4
    },
    {
        name: '仓库同步',
        symbol: 'repository',
        icon: 'material-symbols-light:sync-desktop-outline',
        id: 5
    },
    {
        name: 'Redis',
        symbol: 'redis',
        icon: 'devicon:redis',
        id: 6
    },
    {
        name: 'jsDelivr',
        symbol: 'jsDelivr',
        icon: 'logos:jsdelivr',
        id: 7
    },
    {
        name: 'SpringBoot',
        symbol: 'springBoot',
        icon: 'simple-icons:springboot',
        id: 8
    },
    {
        name: 'Linux',
        symbol: 'linux',
        icon: 'skill-icons:linux-light',
        id: 9
    },
    {
        name: 'Node.js',
        symbol: 'node',
        icon: 'material-icon-theme:nodejs-alt',
        id: 10
    },
    {
        name: 'GitHub',
        symbol: 'github',
        icon: 'mdi:github',
        id: 11
    }
]

export interface categoryCount {
    [categoryId: number]: (typeof category)[number]
}

/**
 * 根据分类id查询分类信息
 * @param categoryId
 * @returns
 */
export const getCategory = (categoryId: number) => category.find((cate) => cate.id == categoryId)
