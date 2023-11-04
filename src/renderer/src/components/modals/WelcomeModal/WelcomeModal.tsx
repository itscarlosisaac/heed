import { JSX, useEffect } from 'react'
import {
  Box,
  Button,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { ApplicationRootState } from '../../../redux/store/store'
import { IApplicationState } from '../../../redux/Application/ApplicationInitialState'
import { IpcChannel } from '../../../../../shared/types'
import { ApplicationActions } from '../../../redux/Application/ApplicationSlice'
import FileService from '../../../services/FileService'
import Unit from '../../../../../system/Unit'
import TemplateParser from '../../../../../system/TemplateParser'

function WelcomeModal(): JSX.Element {
  const dispatch = useDispatch()
  const { editor } = useSelector<ApplicationRootState>((s) => s.application) as IApplicationState

  const { isOpen, onClose } = useDisclosure({
    isOpen: editor.openUnits.length === 0
  })
  function handleCreateFile(): void {
    FileService.CreateFile()
  }
  function handleReadFile(): void {
    FileService.OpenFile()
  }

  function handle(_e: unknown, data: unknown): void {
    const unit = new Unit(data.filename, data.id, data.content, data.extension, data.filepath)
    console.log('File: ', data)

    const parser = new TemplateParser()
    parser.parse(unit.content).then((parsedData) => {
      console.log('Scripts:', parsedData.scripts)

      unit.setScripts(parsedData.scripts)
      unit.setStyles(parsedData.styles)
      unit.setMetatags(parsedData.meta)

      console.log('Styles:', parsedData.styles)
      console.log('Meta Tags:', parsedData.meta)
      console.log('Body Content:', parsedData.bodyContent)
      dispatch(ApplicationActions.OpenUnit(unit.get()))
    })
  }

  useEffect(() => {
    const listener = window.electron.ipcRenderer.on(IpcChannel.openFile, handle)
    return () => listener()
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} isCentered size={'welcomeModal'}>
        <ModalOverlay />
        <ModalContent p={0}>
          <ModalBody w={'100%'} h={'100%'} p={0}>
            <Grid gridTemplateColumns={'1fr 1fr'} w={'100%'} h={'100%'} gap={4}>
              <Box w={'100%'} h={'100%'} bg={'red'} />
              <Flex
                gap={4}
                h={'100%'}
                placeItems={'center'}
                placeContent={'center'}
                flexDirection={'column'}
              >
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

export default WelcomeModal
