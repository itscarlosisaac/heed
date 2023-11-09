import { ElectronAPI } from '@electron-toolkit/preload'
import { dialog } from 'electron'
declare global {
  interface Window {
    electron: ElectronAPI
    api: { }
  }
}
