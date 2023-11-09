import PanelContainer from '../PanelContainer/PanelContainer'
import {
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
  IconButton,
  InputLeftElement
} from '@chakra-ui/react'
import { LinkIcon, UpDownIcon } from '@chakra-ui/icons'

function Transformation(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Transformation'}>
        <HStack mb={3}>
          <Text color={'white'}>Position</Text>
        </HStack>
        <VStack spacing={4}>
          <HStack spacing={4}>
            <InputGroup>
              <Input name={''} color={'white'} placeholder="24" />
              <InputRightElement>
                <Text color={'white'}>X</Text>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input name={''} color={'white'} placeholder="48" />
              <InputRightElement>
                <Text color={'white'}>Y</Text>
              </InputRightElement>
            </InputGroup>
          </HStack>

          <HStack spacing={4}>
            <InputGroup>
              <Input name={''} color={'white'} placeholder="1440" />
              <InputRightElement>
                <Text color={'white'}>W</Text>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input name={''} color={'white'} placeholder="768" />
              <InputRightElement>
                <Text color={'white'}>H</Text>
              </InputRightElement>
            </InputGroup>
            <IconButton aria-label="Link" icon={<LinkIcon />} />
          </HStack>

          <HStack spacing={4} w={"100%"}>
            <InputGroup>
              <Input name={''} color={'white'} placeholder="0" w={'100%'} />
              <InputLeftElement>
                <UpDownIcon color={'white'} />
              </InputLeftElement>
            </InputGroup>
          </HStack>
        </VStack>
      </PanelContainer>
    </>
  )
}

export default Transformation
