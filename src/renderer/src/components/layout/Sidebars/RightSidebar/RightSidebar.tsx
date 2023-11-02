import Properties from '../../../Panels/Properties/Properties'
import { GridItem } from '@chakra-ui/react'
import Transformation from '@renderer/components/Panels/Transformation/Transformation'
import StylePanel from '@renderer/components/Panels/StylePanel/StylePanel'
import ImagePropertiesPanel from '@renderer/components/Panels/ImagePropertiesPanel/ImagePropertiesPanel'
import AnchorPanel from '@renderer/components/Panels/Anchor/AnchorPanel'

function RightSidebar(): JSX.Element {
  return (
    <GridItem area={'right-sidebar'} h={'100%'} bg={'#1A2233'} overflow={'auto'}>
      <Properties />
      <Transformation />
      <StylePanel />
      <AnchorPanel />
      <ImagePropertiesPanel />
    </GridItem>
  )
}

export default RightSidebar
