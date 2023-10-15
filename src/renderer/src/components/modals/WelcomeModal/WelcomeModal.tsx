import { JSX } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button, Flex, useDisclosure
} from '@chakra-ui/react'
export function WelcomeModal (): JSX.Element {

  const { isOpen, onOpen, onClose } = useDisclosure()
  function handleCreateFile(e: never): void {
    console.log('Event', e)
    window.electron.ipcRenderer.send('new-file', {})
  }
  function handleReadFile(e: never): void {
    console.log('Event', e)
    window.electron.ipcRenderer.send('open-file', {})
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap={4} >
              <Button onClick={handleCreateFile}>Create new File</Button>
              <Button onClick={handleReadFile}>Open File</Button>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost'>Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
