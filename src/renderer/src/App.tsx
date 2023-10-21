import { Box } from '@chakra-ui/react'
import { AppHeader } from './components/AppHeader/AppHeader'
import { AppLayout } from './components/layout/AppLayout/AppLayout'
import { WelcomeModal } from './components/modals/WelcomeModal/WelcomeModal'

// TODO: Cleaned up the includes in tsconfig.node and web.
function App(): JSX.Element {
  return (
    <>
      <WelcomeModal />
      <AppLayout AppHeader={AppHeader} LeftSidebar={Box} RightSidebar={Box} BottomSidebar={Box} />
    </>
  )
}

export default App
