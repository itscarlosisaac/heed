import { Button } from '@chakra-ui/react'
function App(): JSX.Element {
  function handleCreateFile(e: never): void {
    console.log('Event', e)
    window.electron.ipcRenderer.send('new-file', {})
  }
  function handleReadFile(e: never): void {
    console.log('Event', e)
    window.electron.ipcRenderer.send('open-file', {})
  }
  return (
    <div className="container">
      <Button onClick={handleCreateFile}>New 320 x 250 Banner</Button>
      <Button onClick={handleReadFile}>Open Banner</Button>
      <div id="screen-container" />
    </div>
  )
}

export default App
