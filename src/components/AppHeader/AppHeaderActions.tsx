import { JSX } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import OpenFileModal from "./deps/OpenFileModal.tsx";
import SaveFileButton from "./deps/SaveFileButton.tsx";

export function AppHeaderActions(): JSX.Element {
  return (
    <>
      <Flex gap={3} alignItems={'center'}>
        <OpenFileModal />
        <SaveFileButton />
        <Button size={'xs'}>Publish</Button>
        <Button size={'xs'}>Preview</Button>
      </Flex>
    </>
  )
}
