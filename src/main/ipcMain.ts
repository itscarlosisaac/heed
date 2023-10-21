// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

import { ipcMain, BrowserWindow } from 'electron'
import { IpcChannel } from '../shared/types'
import Dialog from './Dialog'
import fileReader from '../system/FileReader'
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
    currentWindow.webContents.send('data', { fileData })
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
    const fileReadData = await fileReader.Read(dialogOpenData.filePaths[0])
    const fileName = dialogOpenData.filePaths[0].split('/').at(-1) || 'untitled.html'
    const unit = new Unit(fileName, crypto.randomUUID(), fileReadData)
    currentWindow.webContents.send(IpcChannel.openFile, unit)
  } catch (e) {
    console.log('An error occurred', e)
  }
})

// dialog
//   .showOpenDialog({
//     title: 'Open File',
//     defaultPath: path.join(__dirname, '../assets/sample.html'),
//     // defaultPath: path.join(__dirname, '../assets/'),
//     buttonLabel: 'Open',
//     // Restricting the user to only Text Files.
//     filters: [
//       {
//         name: 'HTML Files',
//         extensions: ['html']
//       }
//     ],
//     properties: ['openFile']
//   })
//   .then((file) => {
//     // Stating whether dialog operation was cancelled or not.
//     console.log('Cancelled', file.canceled)
//     if (!file.canceled) {
//       console.log('File: ', file)
//       const currentWindow = BrowserWindow.getFocusedWindow()
//       if (!currentWindow) return
//
//       currentWindow.webContents.send('data', { file })
//
//       // Creating and Writing to the sample.txt file
//       // fs.readFile(file.filePaths[0], 'utf-8', function (err, data) {
//       //   if (err) throw err
//       //   BrowserWindow.getFocusedWindow().webContents.send('data', { data })
//       //   console.log('Reading data', data)
//       // })
//     }
//   })
//   .catch((err) => {
//     console.log(err)
//   })

//
// const template = `
//   <!DOCTYPE html>
//   <html lang="en">
//
//   <head>
//     <meta charset="utf-8">
//     <meta name="generator" content="Heed 0.0.1">
//     <meta name="template" content="Banner 320x250">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   </head>
//
//   <body>
//
//     <div id="screen-1">
//         <h1>Hello from banner</h1>
//     </div>
//
//     <script type="text/javascript">
//       /**
//        * Handles the DOMContentLoaded event. The DOMContentLoaded event is
//        * fired when the document has been completely loaded and parsed.
//        */
//       function handleDomContentLoaded(event) {
//
//       }
//       window.addEventListener('DOMContentLoaded',
//         handleDomContentLoaded, false);
//
//     </script>
//   </body>
//
//   </html>
// `
//
//   dialog
//     .showSaveDialog({
//       title: '',
//       defaultPath: path.join(__dirname, '../assets/sample.html'),
//       // defaultPath: path.join(__dirname, '../assets/'),
//       buttonLabel: 'Save',
//       // Restricting the user to only Text Files.
//       filters: [
//         {
//           name: 'HTML Files',
//           extensions: ['html']
//         }
//       ],
//       properties: []
//     })
//     .then((file) => {
//       // Stating whether dialog operation was cancelled or not.
//       console.log(file.canceled)
//       if (!file.canceled) {
//         console.log(file.filePath.toString())
//
//         // Creating and Writing to the sample.txt file
//         fs.writeFile(file.filePath.toString(), template, function (err) {
//           if (err) throw err
//           console.log('Saved!')
//         })
//       }
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
//
// ipcMain.on('open-file', (e) => {
//   console.log('new file', e)
//   console.log('Dialog', dialog)
//   dialog
//     .showOpenDialog({
//       title: 'Open File',
//       defaultPath: path.join(__dirname, '../assets/sample.html'),
//       // defaultPath: path.join(__dirname, '../assets/'),
//       buttonLabel: 'Open',
//       // Restricting the user to only Text Files.
//       filters: [
//         {
//           name: 'HTML Files',
//           extensions: ['html']
//         }
//       ],
//       properties: ['openFile']
//     })
//     .then((file) => {
//       // Stating whether dialog operation was cancelled or not.
//       console.log('Cancelled', file.canceled)
//       if (!file.canceled) {
//         console.log('File: ', file)
//
//         // Creating and Writing to the sample.txt file
//         fs.readFile(file.filePaths[0], 'utf-8', function (err, data) {
//           if (err) throw err
//           BrowserWindow.getFocusedWindow().webContents.send('data', { data })
//           console.log('Reading data', data)
//         })
//       }
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })
//
// import FileBusManager from '../shared/Events/FileBusManager'
// import { Message } from '../shared/EventBus/deps/message'
// FileBusManager.subscribe('file-manager', {
//   callback: async (message: Message<string>) => {
//     console.log(`Message timestamp: ${message.getTimestamp()} - issuer: ${message.getIssuer()}`)
//   },
//   errorHandler: (error) => {
//     console.error(error)
//   }
// })
