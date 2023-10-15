import { JSX } from 'react'
import { Button, Flex } from '@chakra-ui/react'

export function AppHeaderActions(): JSX.Element {
  return (
    <>
      <Flex gap={3} alignItems={'center'}>
        <Button size={'xs'}>Publish</Button>
        <Button size={'xs'}>Preview</Button>
        <Button size={'xs'}>Save</Button>
      </Flex>
    </>
  )
}
