import colorConvert, { type HEX, type Keyword, type RGB } from 'color-convert'

/**
 * hexToRGB颜色转换
 * @param hex
 * @returns rgb
 */
export const hexToRgb = (hex: HEX): RGB => colorConvert.hex.rgb(hex)

/**
 * rgbToHex颜色转换
 * @param rgb
 * @returns hex
 */
export const rgbToHex = (rgb: RGB): HEX => '#' + colorConvert.rgb.hex(rgb)

/**
 * keyWordToRgb 关键色转换
 * @param keyWord
 * @returns rgb
 */
export const keyWordToRgb = (keyWord: Keyword): RGB => colorConvert.keyword.rgb(keyWord)
