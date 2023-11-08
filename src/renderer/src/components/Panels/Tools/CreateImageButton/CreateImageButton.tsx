import { Button } from '@chakra-ui/react'
import ComponentEventManager from '../../../../../../system/EventManager/Events/ComponentEventManager'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { ApplicationActions } from '../../../../redux/Application/ApplicationSlice'

function CreateImageButton(): JSX.Element {
  const dispatch = useDispatch()
  function handleCreateImage(): void {
    ComponentEventManager.emit('create', {
      tagName: 'hd-image-display',
      attributes: {
        'image-scaling': 'contain',
        'image-anchor': 'top left',
        'image-src': 'http://placehold.it/200x200',
        alt: 'Image all'
      }
    })
  }

  function handleCreatedImage(data: HTMLElement): void {
    console.log('Created', data)
    dispatch(ApplicationActions.UpdateBody(data.outerHTML))
  }

  useEffect(() => {
    ComponentEventManager.on('created', handleCreatedImage)
    return () => ComponentEventManager.off('created', handleCreatedImage)
  }, [])

  return <Button onClick={handleCreateImage}>Create Image</Button>
}

export default CreateImageButton
