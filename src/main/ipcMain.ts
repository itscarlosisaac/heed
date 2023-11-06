// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
import jsdom from 'jsdom'
const { JSDOM } = jsdom
import { ipcMain, BrowserWindow } from 'electron'
import { IpcChannel } from '../shared/types'
import Dialog from './Dialog'
import fileManager from '../system/FileManager'
import Unit from '../system/Unit'
import crypto from 'crypto'
import path from 'path'
import TemplateWriter from '../system/TemplateWriter'
import FileManager from '../system/FileManager'

ipcMain.on(IpcChannel.createFile, async () => {
  try {
    const fileData = await Dialog.SaveFile({
      buttonLabel: 'Save file',
      title: 'Create new File',
      filters: [Dialog.HTMLDialogFilter]
    })
    const currentWindow = BrowserWindow.getFocusedWindow()
    if (fileData.canceled || !currentWindow) return
    console.log('File Data: ', fileData, __dirname)
    const destination = fileData.filePath ? fileData.filePath : ''
    const templatePath = path.resolve(__dirname, '../../resources/templates/320x250.html')
    const jsPath = path.resolve(__dirname, '../../resources/components/main/Unit/unit.js')
    await TemplateWriter.writeTemplate(templatePath, destination, [jsPath])
    currentWindow.webContents.send(IpcChannel.createFile, { fileData })
  } catch (e) {
    console.log('An error occurred when trying to create the file.', e)
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
    const fileName = path.basename(dialogOpenData.filePaths[0])
    const fileExtension = fileName.split('.').at(-1) || '.html'
    const unit = new Unit(
      fileName,
      crypto.randomUUID(),
      fileReadData,
      fileExtension,
      dialogOpenData.filePaths[0]
    )
    currentWindow.webContents.send(IpcChannel.openFile, unit)
  } catch (e) {
    console.log('An error occurred when trying to open the file', e)
  }
})

ipcMain.on(IpcChannel.saveFile, async (event, data) => {
  const dom = new JSDOM(data.activeUnit.content)
  dom.window.document.querySelector('body').innerHTML = data.data

  try {
    await FileManager.Write(
      path.resolve(data.activeUnit.filepath),
      dom.window.document.querySelector('html').outerHTML
    )
    console.log('Data written to file successfully.')
  } catch (err) {
    console.error('An error occurred:', err)
  }
})
