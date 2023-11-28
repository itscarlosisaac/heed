import { Text, HStack, Input, VStack, Select, InputGroup } from '@chakra-ui/react'
import PanelContainer from "../PanelContainer/PanelContainer.tsx";

function ImagePropertiesPanel(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Image Properties'}>
        <VStack spacing={3} alignItems={'flex-start'}>
          <HStack w={'100%'}>
            <Text color={'white'}>Name: </Text>
            <Input name={'id'} color={'white'} placeholder={'Image'} />
          </HStack>

          <HStack w={'100%'}>
            <Text color={'white'}>Source: </Text>
            <Input name={'name'} color={'white'} placeholder={'imageName'} />
          </HStack>

          <HStack w={'100%'}>
            <Text color={'white'}>Alt Text: </Text>
            <Input name={'name'} color={'white'} placeholder={'imageName'} />
          </HStack>

          <HStack w={'100%'}>
            <InputGroup>
              <Select color={'white'}>
                <option>Resize to Fit</option>
                <option value="">None</option>
                <option value="">Stretch to fill</option>
                <option value="">Crop to fill</option>
              </Select>
            </InputGroup>
          </HStack>

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
export default ImagePropertiesPanel
