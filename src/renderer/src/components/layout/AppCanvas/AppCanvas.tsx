import React, { JSX, useEffect } from 'react'
import { AbsoluteCenter, Box } from '@chakra-ui/react'
import InfiniteViewer, { OnScroll } from 'react-infinite-viewer'
import { useSelector } from 'react-redux'
import { design, DesignConverter } from '../../../../../system/DesignConverter/DesignConverter'
import Transformable from '../../../../../system/Transformables/Transformable'
export function AppCanvas(): JSX.Element {
  const content = useSelector<any>((s) => s.application.editor.openUnits)

  function onScrollViewport(e: OnScroll): void {
    console.log('on Scroll event', e)
  }

  useEffect(() => {
    if (content.length == 0) return
    const parser = new DOMParser()
    const m = DesignConverter.convertToHTMLFormat(design)
    const dom = parser.parseFromString(m, 'text/html')
    console.log('DOM ', dom)
    const children = dom.querySelector('body')
    console.log(children)
    const unit = document.getElementById('unit')
    if (children && unit) {
      unit.appendChild(children)
        MakeImageTransformable()
    }
  }, [content])

  function MakeImageTransformable() {
    const img = document.querySelectorAll('#unit p') as HTMLElement[]
    img.forEach(p => new Transformable(p))
  }

  useEffect(() => {
    // Usage:
    // const element = document.querySelector('#element') as HTMLElement
    // new Transformable(element)
  }, [])

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
              position={'relative'}
              borderColor={'gray.500'}
            ></Box>
          </AbsoluteCenter>
        </div>
      </InfiniteViewer>
    </Box>
  )
}
