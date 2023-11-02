import { HStack, Button } from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'

function Properties(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Tools'}>
        <HStack spacing={4} alignItems={'flex-start'}>
          <Button>Create Image</Button>
          <Button>Create Hotspot</Button>
        </HStack>
      </PanelContainer>
    </>
  )
}

export default Properties
