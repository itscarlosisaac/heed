import Properties from '../../../Panels/Properties/Properties'
import { GridItem } from '@chakra-ui/react'
import Transformation from '../../../Panels/Transformation/Transformation'

function RightSidebar(): JSX.Element {
  return (
    <GridItem area={'right-sidebar'} h={'100%'} bg={'#1A2233'} overflow={'auto'}>
      <Properties />
      <Transformation />
    </GridItem>
  )
}

export default RightSidebar
