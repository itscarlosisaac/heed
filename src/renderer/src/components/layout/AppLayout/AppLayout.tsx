import { JSX } from 'react'
import { Grid, GridItem } from '@chakra-ui/react'
import { Sidebar } from '../Sidebar/Sidebar'
import { AppCanvas } from '../AppCanvas/AppCanvas'

export function AppLayout({
  AppHeader,
  LeftSidebar,
  RightSidebar,
  BottomSidebar
}: any): JSX.Element {
  return (
    <>
      <Grid
        h={'100vh'}
        w={'100vw'}
        boxSizing={'border-box'}
        gridTemplateAreas={`
          "header header header"
          "left-sidebar canvas right-sidebar"
          "bottom-sidebar bottom-sidebar right-sidebar"
          "info-bar info-bar info-bar"
        `}
        gridTemplateColumns={'300px 1fr 300px'}
        gridTemplateRows={'90px 1fr auto 40px'}
      >
        <GridItem area={'header'}>
          <AppHeader />
        </GridItem>

        <GridItem area={'left-sidebar'} h={'100%'} bg={'red'}>
          <Sidebar>
            <LeftSidebar />
          </Sidebar>
        </GridItem>

        <GridItem area={'canvas'}>
          <AppCanvas />
        </GridItem>

        <GridItem area={'right-sidebar'} h={'100%'} bg={'yellow'}>
          <Sidebar>
            <RightSidebar />
          </Sidebar>
        </GridItem>

        <GridItem area={'bottom-sidebar'}>
          <Sidebar>
            <BottomSidebar />
          </Sidebar>
        </GridItem>


        <GridItem area={'info-bar'} bg={"green"}>
          <h4>Info Bar</h4>
        </GridItem>
      </Grid>
    </>
  )
}
