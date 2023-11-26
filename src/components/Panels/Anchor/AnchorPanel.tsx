import {
  HStack,
  VStack,
  Select,
  InputGroup,
} from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'

function AnchorPanel(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Anchoring'}>
        <VStack spacing={4} alignItems={'flex-start'}>
          <HStack w={'100%'}>
            <InputGroup>
              <Select color={'white'}>
                <option>Center</option>
                <option value="">Bottom</option>
                <option value="">Top</option>
                <option value="">Left</option>
                <option value="">Right</option>
                <option value="">Top Right</option>
                <option value="">Top Left</option>
                <option value="">Bottom Right</option>
                <option value="">Bottom Left</option>
              </Select>
            </InputGroup>
          </HStack>
        </VStack>
      </PanelContainer>
    </>
  )
}

export default AnchorPanel
