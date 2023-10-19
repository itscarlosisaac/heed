import { JSX, useEffect } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Grid,
  ModalBody,
  Button,
  Flex,
  Box,
  useDisclosure
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { ApplicationRootState } from '../../../redux/store/store'
import { IApplicationState } from '../../../redux/Application/ApplicationInitialState'
import { IpcChannel } from '../../../../../shared/types'
export function WelcomeModal(): JSX.Element {
  const { editor } = useSelector<ApplicationRootState>((s) => s.application) as IApplicationState

  const { isOpen, onClose } = useDisclosure({
    isOpen: editor.openUnits.length === 0
  })
  function handleCreateFile(): void {
    window.electron.ipcRenderer.send(IpcChannel.createFile, {})
  }
  function handleReadFile(): void {
    window.electron.ipcRenderer.send(IpcChannel.openFile, {})
  }

  useEffect(() => {
    window.electron.ipcRenderer.on('data', (e, data) => {
      console.log("DATA front end", e, data)
    })
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'welcomeModal'}>
        <ModalOverlay />
        <ModalContent p={0}>
          <ModalBody w={'100%'} h={'100%'} p={0}>
            <Grid gridTemplateColumns={'1fr 1fr'} w={'100%'} h={'100%'} gap={4}>
              <Box w={'100%'} h={'100%'} bg={'red'} />
              <Flex gap={4} h={'100%'} placeItems={'center'} placeContent={"center"} flexDirection={'column'}>
                <Button onClick={handleCreateFile}>Create new File</Button>
                <Button onClick={handleReadFile}>Open File</Button>
              </Flex>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
