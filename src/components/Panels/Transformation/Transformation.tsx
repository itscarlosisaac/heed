import PanelContainer from '../PanelContainer/PanelContainer'
import {
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react'
import Position from "./Position.tsx";
import Size from "./Size.tsx";
import Rotation from "./Rotation.tsx";

function Transformation(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Transformation'}>
        <HStack mb={3}>
          <Text color={'white'}>Position</Text>
        </HStack>
        <VStack spacing={4}>
          <Position />
          <Size />
          <Rotation />
        </VStack>
      </PanelContainer>
    </>
  )
}

export default Transformation
