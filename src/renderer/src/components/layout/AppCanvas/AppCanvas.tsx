import { ElementRef, JSX, useRef } from 'react'
import { AbsoluteCenter, Box } from '@chakra-ui/react'
import InfiniteViewer, { OnScroll } from 'react-infinite-viewer'

export function AppCanvas(): JSX.Element {
  const targetRef = useRef<ElementRef<any>>(null)
  function onScrollViewport(e: OnScroll): void {
    console.log('on Scroll event', e)
  }

  return (
    <Box h={'100%'} w={'100%'} bg={'coral'} position={'relative'}>
      <InfiniteViewer
        useWheelScroll={true}
        useAutoZoom={true}
        zoomRange={[0.1, 10]}
        onScroll={onScrollViewport}
        className="viewer"
      >
        <div className="viewport">
          <AbsoluteCenter>
            <Box
              id="unit"
              w={'300px'}
              h={'250px'}
              bg={'gray.100'}
              borderWidth="1px"
              borderColor={'gray.500'}
            ></Box>
          </AbsoluteCenter>
        </div>
      </InfiniteViewer>
    </Box>
  )
}
