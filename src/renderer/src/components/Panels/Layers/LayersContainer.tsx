import { VStack } from '@chakra-ui/react'
import { LayersContainerPropTypes } from './Layers.types'
import { JSX } from 'react'

function LayersContainer({ children }: LayersContainerPropTypes): JSX.Element {
  return (
    <VStack spacing={0} alignItems={'flex-start'} >
      {children}
    </VStack>
  )
}

export default LayersContainer
