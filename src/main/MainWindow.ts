import path from 'path'
import { app, BrowserWindow, shell, WebContents } from 'electron'
import { is } from '@electron-toolkit/utils'
import installExtension, {
  REDUX_DEVTOOLS,
  REACT_DEVELOPER_TOOLS
} from 'electron-devtools-installer'
import { resolveHtmlPath } from './utils'
import { GenericVoidFunction } from '../shared/types'

type OnEventType = 'closed' | 'ready-to-show'

const installExtensions = async (): Promise<void> => {
  installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS])
    .then((name) => console.log(`Added Extension:  ${name}`))
    .catch((err) => console.log('An error occurred: ', err))
}

class MainWindow {
  private static instance: BrowserWindow | null = null

  public static async createWindow(): Promise<void> {
    if (is.dev) {
      await installExtensions()
    }

    const RESOURCES_PATH = app.isPackaged
      ? path.join(process.resourcesPath, 'assets')
      : path.join(__dirname, './assets')

    const getAssetPath = (...paths: string[]): string => {
      return path.join(RESOURCES_PATH, ...paths)
    }

    MainWindow.set(
      new BrowserWindow({
        height: 700,
        icon: getAssetPath('../../../resources/icon.png'),
        show: false,
        webPreferences: {
          contextIsolation: true,
          preload: path.join(__dirname, '../preload/index.js'),
          sandbox: false
        },
        width: 1200
      })
    )

    MainWindow.loadURL(resolveHtmlPath('index.html'))

    MainWindow.on('ready-to-show', () => {
      if (!MainWindow.exists()) {
        throw new Error('"MainWindow" is not defined')
      }
      MainWindow.show()
    })

    MainWindow.on('closed', () => {
      MainWindow.set(null)
    })

    // Open urls in the user's browser
    MainWindow.getWebContents()?.setWindowOpenHandler((eventData) => {
      shell.openExternal(eventData.url)
      return { action: 'deny' }
    })
  }

  public static exists(): boolean {
    return !!MainWindow.instance
  }

  public static getWebContents(): WebContents | null {
    return MainWindow.instance?.webContents || null
  }

  public static loadURL(url: string): void {
    MainWindow.instance?.loadURL(url)
  }

  public static minimize(): void {
    MainWindow.instance?.minimize()
  }

  public static on(event: OnEventType, listener: GenericVoidFunction): void {
    MainWindow.instance?.on(event as any, listener)
  }

  public static set(window: BrowserWindow | null): void {
    MainWindow.instance = window
  }

  public static show(): void {
    MainWindow.instance?.show()
  }
}

export default MainWindow
