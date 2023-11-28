import { Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import ComponentEventManager from "../../../../system/EventManager/Events/ComponentEventManager.ts";
import control from "../../../../system/Commands/Moveable";

function CreateHotspotButton(): JSX.Element {
  function handleCreateHotspot(): void {
    ComponentEventManager.emit('create', {
      tagName: 'hd-hotspot',
      attributes: {
        width: '50px',
        height: '50px'
      }
    })
  }

  function handleCreatedHotspot(data: HTMLElement): void {
    data.style.position = "absolute"
    data.addEventListener('mousedown', (event) => {
      control.execute("select", [event, data as HTMLElement])
    })
  }

  useEffect(() => {
    ComponentEventManager.on('created', handleCreatedHotspot)
    return () => ComponentEventManager.off('created', handleCreatedHotspot)
  }, [])

  return <Button onClick={handleCreateHotspot}>Create Hotspot</Button>
}

export default CreateHotspotButton
