import { Button } from '@chakra-ui/react'
import ComponentEventManager from '../../../../../../system/EventManager/Events/ComponentEventManager'
import { useDispatch } from 'react-redux'
import { ApplicationActions } from '../../../../redux/Application/ApplicationSlice'
import { useEffect } from 'react'

function CreateHotspotButton(): JSX.Element {
  const dispatch = useDispatch()
  function handleCreateHotspot(): void {
    ComponentEventManager.emit('create', 'hd-hotspot')
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
