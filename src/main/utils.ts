import path from 'path'
import { is } from '@electron-toolkit/utils'
export const resolveHtmlPath = (htmlFileName: string): string => {
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    return process.env['ELECTRON_RENDERER_URL']
  }
  return `file://${path.resolve(__dirname, '../renderer/', htmlFileName)}`
}
