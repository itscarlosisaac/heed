import Properties from '../../../Panels/Properties/Properties'
import { GridItem } from '@chakra-ui/react'
import Transformation from '../../../Panels/Transformation/Transformation'
import StylePanel from '../../../Panels/StylePanel/StylePanel'
import ImagePropertiesPanel from '@renderer/components/Panels/components/Image/ImagePropertiesPanel/ImagePropertiesPanel'

function RightSidebar(): JSX.Element {
  return (
    <GridItem area={'right-sidebar'} h={'100%'} bg={'#1A2233'} overflow={'auto'}>
      <Properties />
      <Transformation />
      <StylePanel />
      <ImagePropertiesPanel />
    </GridItem>
  )
}

export default RightSidebar
