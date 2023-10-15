// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// import path from 'path'
// import fs from 'fs'
// import { dialog, ipcMain } from 'electron'
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
// ipcMain.on('new-file', (e) => {
//   console.log('new file', e)
//   console.log('Dialog', dialog)
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
