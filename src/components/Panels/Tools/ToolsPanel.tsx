import { HStack } from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'
import CreateHotspotButton from './CreateHotspotButton/CreateHotspotButton'
import CreateImageButton from './CreateImageButton/CreateImageButton'

function Properties(): JSX.Element {
  return (
    <>
      <PanelContainer title={'Tools'}>
        <HStack spacing={3} alignItems={'flex-start'}>
          <CreateImageButton />
          <CreateHotspotButton />
        </HStack>
      </PanelContainer>
    </>
  )
}

export default Properties