import { Button } from '@chakra-ui/react'
import { useEffect } from 'react'
import ComponentEventManager from '../../../../system/EventManager/Events/ComponentEventManager'
import control from "../../../../system/Commands/Moveable";

function CreateImageButton(): JSX.Element {
  // const dispatch = useDispatch()
  function handleCreateImage(): void {
    ComponentEventManager.emit('create', {
      tagName: 'hd-image-display',
      attributes: {
        'data-type': 'clickable',
        'image-scaling': 'contain',
        'image-anchor': 'top left',
        'image-src': 'http://placehold.it/200x200',
        alt: 'Image all'
      }
    })
  }

  function handleCreatedImage(data: HTMLElement): void {
    data.style.position = "absolute"
    data.addEventListener('mousedown', (event) => {
      control.execute("select", [event, event.target as HTMLElement])
    })
  }

  useEffect(() => {
    ComponentEventManager.on('created', handleCreatedImage)
    return () => ComponentEventManager.off('created', handleCreatedImage)
  }, [])

  return <Button onClick={handleCreateImage}>Create Image</Button>
}

export default CreateImageButton
