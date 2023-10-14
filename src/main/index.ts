import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import * as path from 'path'
import * as fs from 'fs'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

const template = `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="utf-8">
    <meta name="generator" content="Heed 0.0.1">
    <meta name="template" content="Banner 320x250">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body>

    <div id="screen-1">
        <h1>Hello from banner</h1>
    </div>

    <script type="text/javascript">
      /**
       * Handles the DOMContentLoaded event. The DOMContentLoaded event is
       * fired when the document has been completely loaded and parsed.
       */
      function handleDomContentLoaded(event) {

      }
      window.addEventListener('DOMContentLoaded',
        handleDomContentLoaded, false);

    </script>
  </body>

  </html>
`

ipcMain.on('new-file', (e) => {
  console.log('new file', e)
  console.log('Dialog', dialog)
  dialog
    .showSaveDialog({
      title: '',
      defaultPath: path.join(__dirname, '../assets/sample.html'),
      // defaultPath: path.join(__dirname, '../assets/'),
      buttonLabel: 'Save',
      // Restricting the user to only Text Files.
      filters: [
        {
          name: 'HTML Files',
          extensions: ['html']
        }
      ],
      properties: []
    })
    .then((file) => {
      // Stating whether dialog operation was cancelled or not.
      console.log(file.canceled)
      if (!file.canceled) {
        console.log(file.filePath.toString())

        // Creating and Writing to the sample.txt file
        fs.writeFile(file.filePath.toString(), template, function (err) {
          if (err) throw err
          console.log('Saved!')
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

ipcMain.on('open-file', (e) => {
  console.log('new file', e)
  console.log('Dialog', dialog)
  dialog
    .showOpenDialog({
      title: 'Open File',
      defaultPath: path.join(__dirname, '../assets/sample.html'),
      // defaultPath: path.join(__dirname, '../assets/'),
      buttonLabel: 'Open',
      // Restricting the user to only Text Files.
      filters: [
        {
          name: 'HTML Files',
          extensions: ['html']
        }
      ],
      properties: ['openFile']
    })
    .then((file) => {
      // Stating whether dialog operation was cancelled or not.
      console.log('Cancelled', file.canceled)
      if (!file.canceled) {
        console.log('File: ', file)

        // Creating and Writing to the sample.txt file
        fs.readFile(file.filePaths[0], 'utf-8', function (err, data) {
          if (err) throw err
          BrowserWindow.getFocusedWindow().webContents.send('data', { data })
          console.log('Reading data', data)
        })
      }
    })
    .catch((err) => {
      console.log(err)
    })
})
