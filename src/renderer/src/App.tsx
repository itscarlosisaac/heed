import { Box, Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { AppHeader } from './components/AppHeader/AppHeader'
import { AppLayout } from './components/layout/AppLayout/AppLayout'
function App(): JSX.Element {
  const dispatch = useDispatch();
  dispatch({type: "test", payload: {}})
  function handleCreateFile(e: never): void {
    console.log('Event', e)
    window.electron.ipcRenderer.send('new-file', {})
  }
  function handleReadFile(e: never): void {
    console.log('Event', e)
    window.electron.ipcRenderer.send('open-file', {})
  }
  return (
    <AppLayout
      AppHeader={AppHeader}
      LeftSidebar={Box}
      RightSidebar={Box}
      BottomSidebar={Box}
    />
    // <div className="container">
    //
    //   {/*<Button onClick={handleCreateFile}>New 320 x 250 Banner</Button>*/}
    //   {/*<Button onClick={handleReadFile}>Open Banner</Button>*/}
    //   <div id="screen-container" />
    // </div>
  )
}

export default App
