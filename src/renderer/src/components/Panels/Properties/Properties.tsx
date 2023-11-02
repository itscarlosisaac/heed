import { Text, HStack, Input, VStack } from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'

function Properties(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Properties'}>
        <VStack spacing={4} alignItems={'flex-start'}>
          <HStack w={'100%'}>
            <Text color={'white'}>Id: </Text>
            <Input name={'id'} color={'white'} placeholder={'id'} />
          </HStack>

          <HStack w={'100%'}>
            <Text color={'white'}>Name: </Text>
            <Input name={'name'} color={'white'} placeholder={'name'} />
          </HStack>
        </VStack>
      </PanelContainer>
    </>
  )
}

export default Properties
