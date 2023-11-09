import { Flex, Text } from '@chakra-ui/react'
import { LockIcon, ViewIcon } from '@chakra-ui/icons'

function LayerItem(): JSX.Element {
  return (
    <>
      <Flex
        alignItems={'center'}
        justifyContent={'space-between'}
        w={'100%'} py={1}
        borderBottom={'1px solid'}
        borderColor={'rgba(255,255,255,0.1)'}
      >
        <Text color={'white'} fontSize={"12px"}>Rectangle 1</Text>
        <Flex gap={2}>
          <LockIcon boxSize={'10px'} color={'red'} />
          <ViewIcon boxSize={'10px'} color={'red'} />
        </Flex>
      </Flex>
    </>
  )
}

export default LayerItem
