import { JSX } from 'react'
import { Button, Flex } from '@chakra-ui/react'
import FileService from '../../services/FileService'

export function AppHeaderActions(): JSX.Element {
  function SaveFile() {
    console.log('will save file.')
    FileService.SaveFile()
  }

  return (
    <>
      <Flex gap={3} alignItems={'center'}>
        <Button size={'xs'}>Publish</Button>
        <Button size={'xs'}>Preview</Button>
        <Button size={'xs'} onClick={SaveFile}>
          Save
        </Button>
      </Flex>
    </>
  )
}
