import { HStack, Button } from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'
import CreateHotspotButton from './CreateHotspotButton/CreateHotspotButton'

function Properties(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Tools'}>
        <HStack spacing={4} alignItems={'flex-start'}>
          <Button>Create Image</Button>
          <CreateHotspotButton />
        </HStack>
      </PanelContainer>
    </>
  )
}

export default Properties
