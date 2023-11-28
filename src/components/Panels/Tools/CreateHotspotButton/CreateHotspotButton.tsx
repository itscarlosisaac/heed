import { Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import ComponentEventManager from "../../../../system/EventManager/Events/ComponentEventManager.ts";
import control from "../../../../system/Commands/Moveable";

function CreateHotspotButton(): JSX.Element {
  function handleCreateHotspot(): void {
    ComponentEventManager.emit('create', {
      tagName: 'hd-hotspot',
      attributes: {
        'data-type': 'clickable'
      }
    })
  }

  function handleCreatedHotspot(element: HTMLElement): void {
    element.style.position = "absolute"
    element.addEventListener('mousedown', (event) => {
      control.execute("select", [event, element as HTMLElement])
    })
  }

  useEffect(() => {
    ComponentEventManager.on('created', handleCreatedHotspot)
    return () => ComponentEventManager.off('created', handleCreatedHotspot)
  }, [])

  return <Button onClick={handleCreateHotspot}>Create Hotspot</Button>
}

export default CreateHotspotButton
