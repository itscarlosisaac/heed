import { JSX, } from 'react'
import {
  Box,
  Flex,
  Grid,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { ApplicationRootState } from '../../../redux/store/store'
import { IApplicationState } from '../../../redux/Application/ApplicationInitialState'
import OpenFileModal from "../../AppHeader/deps/OpenFileModal.tsx";
import CreateFileButton from "../../AppHeader/deps/CreateFileButton.tsx";

function WelcomeModal(): JSX.Element {
  const { editor } = useSelector<ApplicationRootState>((s) => s.application) as IApplicationState

  const { isOpen, onClose } = useDisclosure({
    isOpen: editor.openUnits.length === 0
  })

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
                <CreateFileButton />
                <OpenFileModal />
              </Flex>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default WelcomeModal
