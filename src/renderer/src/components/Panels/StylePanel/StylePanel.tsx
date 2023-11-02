import {
  Text,
  HStack,
  Input,
  VStack,
  Select,
  InputGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb
} from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'

function StylePanel(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Style'}>
        <VStack spacing={4} alignItems={'flex-start'}>
          <VStack w={'100%'} alignItems={'flex-start'}>
            <Text color={'white'}>Fill: </Text>

            <HStack w={'100%'}>
              <Slider aria-label="slider-ex-1" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Input name={'opacity'} color={'white'} placeholder={'100'} />
            </HStack>
            <HStack w={'100%'}>
              <Input name={'name'} color={'white'} placeholder={'Color'} />
            </HStack>
          </VStack>

          <HStack w={'100%'}>
            <InputGroup>
              <Select color={'white'}>
                <option>Visible</option>
                <option value="">Hidden</option>
                <option value="">Collapse</option>
                <option value="">Initial</option>
                <option value="">Inherit</option>
              </Select>
            </InputGroup>
          </HStack>

          <HStack w={'100%'}>
            <InputGroup>
              <Select color={'white'}>
                <option>Visible</option>
                <option value="">Hidden</option>
                <option value="">Scroll</option>
                <option value="">Auto</option>
                <option value="">Initial</option>
                <option value="">Inherit</option>
              </Select>
            </InputGroup>
          </HStack>
        </VStack>
      </PanelContainer>
    </>
  )
}

export default StylePanel
