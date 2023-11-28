import { JSX } from 'react'
import { Flex, Text, Grid } from '@chakra-ui/react'
import { AppHeaderActions } from './AppHeaderActions'

export function AppHeader(): JSX.Element {
  return (
    <>
      <Grid
        px={10}
        h={"100%"}
        w={'100%'}
        bg={'app.gray.light'}
        boxSizing={'border-box'}
        gridTemplateColumns={'1fr 1fr'}
      >
        <Flex flexGrow={2} alignItems={'center'}>
          <Text color={'#6B7A99'}></Text>
        </Flex>
        <Flex justifyContent={'flex-end'}>
          <AppHeaderActions />
        </Flex>
      </Grid>
    </>
  )
}
