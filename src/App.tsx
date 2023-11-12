import {Box} from '@chakra-ui/react'
import {AppHeader} from './components/AppHeader/AppHeader'
import {AppLayout} from './components/layout/AppLayout/AppLayout'
import './lib/src/components/index.ts'
import RightSidebar from './components/layout/Sidebars/RightSidebar/RightSidebar'
import LeftSidebar from './components/layout/Sidebars/LeftSidebar/LeftSidebar'
import WelcomeModal from './components/modals/WelcomeModal/WelcomeModal'
import {useSelector} from "react-redux";
import {ApplicationRootState} from "./redux/store/store.ts";

// TODO: Cleaned up the includes in tsconfig.node and web.
function App(): JSX.Element {
    const state = useSelector<ApplicationRootState>(s => s);
    console.log("STATE: ",state)
    return (
        <>
            <WelcomeModal/>
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
