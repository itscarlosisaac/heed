import { Box } from '@chakra-ui/react'
import { AppHeader } from './components/AppHeader/AppHeader'
import { AppLayout } from './components/layout/AppLayout/AppLayout'
import './lib/src/components/index.ts'
import RightSidebar from './components/layout/Sidebars/RightSidebar/RightSidebar'
import LeftSidebar from './components/layout/Sidebars/LeftSidebar/LeftSidebar'
import WelcomeModal from './components/modals/WelcomeModal/WelcomeModal'
import { invoke } from '@tauri-apps/api'



// TODO: Cleaned up the includes in tsconfig.node and web.
function App(): JSX.Element {
    function handleClick(){
        invoke('greet', { name: 'Carlos Marte' })
            // `invoke` returns a Promise
            .then((response) => console.log(response))

        invoke('get_window_name', {name: "hello World"})
            // `invoke` returns a Promise
            .then((response) => console.log(response))
            .catch(e => console.log("Error: ", e ))
    }
  return (
    <>
      {/*<WelcomeModal />*/}
        <button onClick={handleClick}>
            Click Me
        </button>
      <AppLayout
        AppHeader={AppHeader}
        LeftSidebar={LeftSidebar}
        RightSidebar={RightSidebar}
        BottomSidebar={Box}
      />
    </>
  )
}

export default App
