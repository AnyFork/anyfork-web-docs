// https://github.com/prettier/eslint-plugin-prettier?tab=readme-ov-file#configuration-new-eslintconfigjs
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
    eslintPluginPrettier,
    {
        // 其他自定义规则可以放在这里
        rules: {}
    },
    // 排除不需要eslint进行代码质量检测的文件，全局忽略规则,可以不用单独配置.eslintignore文件
    {
        ignores: ['node_modules/**', '.output/**', 'public/**']
    }
)
