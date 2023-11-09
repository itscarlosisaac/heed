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
import { DesignConverter } from '../../../../../system/DesignConverter/DesignConverter'
import Transformable from '../../../../../system/Transformables/Transformable'

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

  function onOpenFile(_e: unknown, data: unknown): void {
    const unit = new Unit(data.filename, data.id, data.content, data.extension, data.filepath)
    const Domparser = new DOMParser()
    const parsedDoc = Domparser.parseFromString(data.content, 'text/html')

    console.log('DA', parsedDoc)
    const heedUnit = parsedDoc.querySelector('heed-unit')
    console.log('heedUnit', heedUnit)

    const unitElement = document.querySelector('#unit')
    // const heedUnitContent = heedUnit.innerHTML
    console.log('HTML = ', heedUnit.children)

    // unitElement.innerHTML = '' // Clear existing content
    // unitElement.innerHTML = heedUnitContent // Set new content
    // document.querySelector("#unit").innerHTML = heedUnit.innerHTML
    const children = unitElement.children
    for (let i = 0; i < children.length; i++) {
      unitElement.innerHTML += heedUnit.children[i]
      new Transformable(children[i])
    }

    const parser = new TemplateParser()
    parser.parse(unit.content).then((parsedData) => {
      unit.setScripts(parsedData.scripts)
      unit.setStyles(parsedData.styles)
      unit.setMetatags(parsedData.meta)
      dispatch(ApplicationActions.OpenUnit(unit.get()))
    })
  }

  useEffect(() => {
    const listener = window.electron.ipcRenderer.on(IpcChannel.openFile, onOpenFile)
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
