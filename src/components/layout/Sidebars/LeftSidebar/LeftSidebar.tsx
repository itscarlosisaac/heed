import Layers from '../../../Panels/Layers/Layers'
import { GridItem } from '@chakra-ui/react'
import ToolsPanel from '../../../Panels/Tools/ToolsPanel'

function LeftSidebar(): JSX.Element {
  return (
    <>
      <GridItem area={'left-sidebar'} h={'100%'} overflow={'auto'}>
        <Layers />
        <ToolsPanel />
      </GridItem>
    </>
  )
}

export default LeftSidebar
