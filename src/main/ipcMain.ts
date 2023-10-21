// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

import { ipcMain, BrowserWindow } from 'electron'
import { IpcChannel } from '../shared/types'
import Dialog from './Dialog'
import fileManager from '../system/FileManager'
import Unit from '../system/Unit'
import crypto from 'crypto'

ipcMain.on(IpcChannel.createFile, async () => {
  try {
    const fileData = await Dialog.SaveFile({
      buttonLabel: 'Save file',
      title: 'Create new File',
      filters: [Dialog.HTMLDialogFilter]
    })
    const currentWindow = BrowserWindow.getFocusedWindow()
    if (fileData.canceled || !currentWindow) return
    currentWindow.webContents.send(IpcChannel.createFile, { fileData })
  } catch (e) {
    console.log('An error occurred', e)
  }
})

ipcMain.on(IpcChannel.openFile, async () => {
  try {
    const dialogOpenData = await Dialog.OpenFile({
      buttonLabel: 'Open File',
      title: 'Open Ad Unit',
      filters: [Dialog.HTMLDialogFilter]
    })
    const currentWindow = BrowserWindow.getFocusedWindow()
    if (dialogOpenData.canceled || !currentWindow) return
    const [fileReadData] = await Promise.all([fileManager.Read(dialogOpenData.filePaths[0])])
    const fileName = dialogOpenData.filePaths[0].split('/').at(-1) || 'untitled.html'
    const fileExtension = fileName.split('.').at(-1) || '.html'
    const unit = new Unit(fileName, crypto.randomUUID(), fileReadData, fileExtension)
    currentWindow.webContents.send(IpcChannel.openFile, unit)
  } catch (e) {
    console.log('An error occurred', e)
  }
})

ipcMain.on(IpcChannel.saveFile, async () => {
  console.log('Will save.')
})
