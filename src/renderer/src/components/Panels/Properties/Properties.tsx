import {
  Text,
  HStack,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Checkbox,
  VStack
} from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'

function Properties(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Properties'}>
        <VStack spacing={4} alignItems={'flex-start'}>
          <HStack w={'100%'}>
            <Text color={'white'}>Id: </Text>
            <Input name={'id'} color={'white'} placeholder={'Image'} />
          </HStack>

          <HStack w={'100%'}>
            <Text color={'white'}>Name: </Text>
            <Input name={'name'} color={'white'} placeholder={'imageName'} />
          </HStack>

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
            <Checkbox name={'hidden'} color={'white'}>
              Hidden
            </Checkbox>
          </HStack>
        </VStack>
      </PanelContainer>
    </>
  )
}

export default Properties
