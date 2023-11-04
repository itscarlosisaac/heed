import { HStack, Button } from '@chakra-ui/react'
import PanelContainer from '../PanelContainer/PanelContainer'
import ComponentInstantiator from '../../../../../system/ComponentInstantiator/ComponentInstantiator'
import Transformable from '../../../../../system/Transformables/Transformable'

function Properties(): JSX.Element {
  function handleCreateHotspot(): void {
    const unit = document.querySelector('#unit body') as HTMLElement
    if (!unit) return
    console.log('Will create hotspot')
    ComponentInstantiator.setContainer(unit)

    const element = ComponentInstantiator.createAndAppendElement('hd-hotspot')
    const b = new Transformable(element)
  }

  return (
    <>
      <PanelContainer title={'Tools'}>
        <HStack spacing={4} alignItems={'flex-start'}>
          <Button>Create Image</Button>
          <Button onClick={handleCreateHotspot}>Create Hotspot</Button>
        </HStack>
      </PanelContainer>
    </>
  )
}

export default Properties
