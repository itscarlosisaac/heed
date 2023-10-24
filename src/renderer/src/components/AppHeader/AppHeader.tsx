import { JSX } from 'react'
import { Flex, Text, Grid } from '@chakra-ui/react'
import { AppHeaderActions } from './AppHeaderActions'

export function AppHeader(): JSX.Element {
  return (
    <>
      <Grid
        h={24}
        px={10}
        w={'100%'}
        bg={'#1A2233'}
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
