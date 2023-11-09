import { Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { ApplicationActions } from '../../../../redux/Application/ApplicationSlice'
import { useEffect } from 'react'
import ComponentEventManager from "../../../../system/EventManager/Events/ComponentEventManager.ts";

function CreateHotspotButton(): JSX.Element {
  const dispatch = useDispatch()
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
    console.log('Created', data)
    dispatch(ApplicationActions.UpdateBody(data.outerHTML))
  }

  useEffect(() => {
    ComponentEventManager.on('created', handleCreatedHotspot)
    return () => ComponentEventManager.off('created', handleCreatedHotspot)
  }, [])

  return <Button onClick={handleCreateHotspot}>Create Hotspot</Button>
}

export default CreateHotspotButton
