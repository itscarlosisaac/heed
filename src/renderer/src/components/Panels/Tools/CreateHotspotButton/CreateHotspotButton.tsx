import { Button } from '@chakra-ui/react'
import ComponentEventManager from '../../../../../../system/EventManager/Events/ComponentEventManager'

function CreateHotspotButton(): JSX.Element {
  function handleCreateHotspot(): void {
    ComponentEventManager.emit('create', 'hd-hotspot')
  }

  return <Button onClick={handleCreateHotspot}>Create Hotspot</Button>
}

export default CreateHotspotButton
