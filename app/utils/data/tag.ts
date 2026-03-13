export const tag = [
    {
        name: 'Algolia',
        icon: 'devicon:algolia',
        symbol: 'algolia',
        id: 1
    },
    {
        name: 'gitee',
        icon: 'simple-icons:gitee',
        symbol: 'gitee',
        id: 2
    },
    {
        name: 'github',
        symbol: 'github',
        icon: 'ri:github-fill',
        id: 3
    },
    {
        name: '网址',
        symbol: 'website',
        icon: 'mdi:web',
        id: 4
    },
    {
        name: 'VMware',
        symbol: 'vmware',
        icon: 'lineicons:vmware',
        id: 5
    },
    {
        name: 'CDN',
        symbol: 'cdn',
        icon: 'fa-brands:keycdn',
        id: 6
    },
    {
        name: 'font-family',
        symbol: 'font',
        icon: 'radix-icons:font-family',
        id: 7
    },
    {
        name: 'Java',
        symbol: 'java',
        icon: 'skill-icons:java-light',
        id: 8
    },
    {
        name: 'Rocky',
        symbol: 'rocky',
        icon: 'logos:rocky-linux-icon',
        id: 9
    },
    {
        name: 'Nvm',
        icon: 'arcticons:nvm',
        symbol: 'nvm',
        id: 10
    },
    {
        name: 'Git',
        symbol: 'git',
        icon: 'material-icon-theme:git',
        id: 11
    }
]

/**
 * 查询标签信息
 * @param tagsId
 * @returns
 */
export const getTags = (tagsId: number[]) => {
    return tag.filter((tg) => tagsId.includes(tg.id))
}
