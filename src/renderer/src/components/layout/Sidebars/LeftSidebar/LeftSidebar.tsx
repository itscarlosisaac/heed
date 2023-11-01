import Layers from '../../../Panels/Layers/Layers'
import { GridItem } from '@chakra-ui/react'

function LeftSidebar(): JSX.Element {
  return (
    <>
      <GridItem area={'left-sidebar'} h={'100%'} bg={'#1A2233'} overflow={'auto'}>
        <Layers />
      </GridItem>
    </>
  )
}

export default LeftSidebar
