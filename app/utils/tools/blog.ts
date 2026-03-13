/**
 * 统计markdown文本字数和阅读时间
 */
export const calculateContentStats = (markdownContent: string, wordsPerMinute: number = 300) => {
    if (!markdownContent) return { wordCount: 0, readingTime: 0 }
    // 步骤1：移除 Markdown 语法（标题、链接、图片、代码块等）
    const plainText = markdownContent
        // 移除代码块（```xxx...```）
        .replace(/```[\s\S]*?```/g, '')
        // 移除行内代码（`xxx`）
        .replace(/`[^`]+`/g, '')
        // 移除链接（[text](url)）
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // 移除图片（![alt](url)）
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
        // 移除 Markdown 标记（#、*、_、> 等）
        .replace(/[#*_>~`\\]/g, '')
        // 移除 HTML 标签
        .replace(/<[^>]+>/g, '')
        // 移除多余空格/换行
        .replace(/\s+/g, ' ')
        .trim()

    // 步骤2：统计有效字数（区分中/英文，排除纯空格）
    // 中文汉字：[\u4e00-\u9fa5]，中文标点：[\u3000-\u303f\u2000-\u206f\uff00-\uffef]
    // 英文单词：[a-zA-Z0-9]+
    const chineseChars = plainText.match(/[\u4e00-\u9fa5]/g) || []
    const englishWords = plainText.match(/[a-zA-Z0-9]+/g) || []
    // 总字数 = 中文字数 + 英文单词数（英文按“单词”算，而非字母）
    const wordCount = chineseChars.length + englishWords.length
    // 步骤3：计算阅读时间（向上取整，至少 1 分钟）
    const readingTime = Math.max(1, Math.round((wordCount / wordsPerMinute) * 10) / 10)
    return { wordCount, readingTime }
}
