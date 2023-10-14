import { useEffect } from 'react'
import * as htmlparser2 from 'htmlparser2'
function App(): Element {
  function handleCreateFile(e: any): void {
    console.log('Event', e)
    window.electron.ipcRenderer.send('new-file', {})
  }
  function handleReadFile(e: any): void {
    console.log('Event', e)
    window.electron.ipcRenderer.send('open-file', {})
  }

  function append(event: any, data: any) {
    const dom = htmlparser2.parseDocument(data.data)
    console.log('DOM: ', dom)
    const handler = new htmlparser2.DomHandler()
    console.log('HANDLER: ', handler)
    // const parsedDocument = parser.parseFromString(data, 'text/html')
    const screen = document.getElementById('screen-container')
    // screen.innerHTML = '';
    // htmlparser2.DomUtils.appendChild(screen, dom);
    screen.insertAdjacentHTML('afterbegin',data.data);
  }
  useEffect(() => {
    window.electron.ipcRenderer.on('data', append)
    return () => {
      window.electron.ipcRenderer.removeListener('data', append)
    }
  }, [])

  return (
    <div className="container">
      <button onClick={handleCreateFile}>New 320 x 250 Banner</button>
      <button onClick={handleReadFile}>Open Banner</button>
      <div id="screen-container" />
    </div>
  )
}

export default App
