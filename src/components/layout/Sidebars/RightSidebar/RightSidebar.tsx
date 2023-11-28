import Properties from '../../../Panels/Properties/Properties'
import { GridItem } from '@chakra-ui/react'
import Transformation from "../../../Panels/Transformation/Transformation.tsx";
import StylePanel from "../../../Panels/StylePanel/StylePanel.tsx";
import AnchorPanel from "../../../Panels/Anchor/AnchorPanel.tsx";
import ImagePropertiesPanel from "../../../Panels/ImagePropertiesPanel/ImagePropertiesPanel.tsx";

function RightSidebar(): JSX.Element {
  return (
    <GridItem area={'right-sidebar'} h={'100%'} overflow={'auto'}>
      <Properties />
      <Transformation />
      <StylePanel />
      <AnchorPanel />
      <ImagePropertiesPanel />
    </GridItem>
  )
}

export default RightSidebar
