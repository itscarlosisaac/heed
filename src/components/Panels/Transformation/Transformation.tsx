import PanelContainer from '../PanelContainer/PanelContainer'
import {
  VStack,
} from '@chakra-ui/react'
import Position from "./Position.tsx";
import Size from "./Size.tsx";
import Rotation from "./Rotation.tsx";

function Transformation(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Transformation'}>
        <VStack spacing={3} pt={2}>
          <Position />
          <Size />
          <Rotation />
        </VStack>
      </PanelContainer>
    </>
  )
}

export default Transformation
