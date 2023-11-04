import SharedState from './ShareState'

class HandleManager {
  private element: HTMLElement
  private handles: SVGCircleElement[] = []
  private rotationHandle: SVGCircleElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  )
  protected sharedState: SharedState

  constructor(element: HTMLElement, sharedState: SharedState) {
    this.element = element
    this.sharedState = sharedState
    this.appendHandles()
    this.appendRotateHandle()
  }

  private appendHandles(): void {
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.style.position = 'absolute'
    svg.style.top = '0'
    svg.style.left = '0'
    svg.style.overflow = 'visible'
    svg.style.pointerEvents = 'none'

    this.element.appendChild(svg)

    const positions = [
      { x: '0%', y: '0%', position: 'top-left', cursor: 'nw-resize' },
      { x: '50%', y: '0%', position: 'top-center', cursor: 'n-resize' },
      { x: '100%', y: '0%', position: 'top-right', cursor: 'ne-resize' },
      { x: '0%', y: '50%', position: 'middle-left', cursor: 'w-resize' },
      { x: '100%', y: '50%', position: 'middle-right', cursor: 'e-resize' },
      { x: '0%', y: '100%', position: 'bottom-left', cursor: 'sw-resize' },
      { x: '50%', y: '100%', position: 'bottom-center', cursor: 's-resize' },
      { x: '100%', y: '100%', position: 'bottom-right', cursor: 'se-resize' }
    ]

    for (const { x, y, position, cursor } of positions) {
      const handle = document.createElementNS(svgNS, 'circle')
      handle.setAttribute('cx', x)
      handle.setAttribute('cy', y)
      handle.setAttribute('r', '4')
      handle.setAttribute('data-position', position) // Setting data-position attribute
      handle.style.fill = '#1E88E5'
      handle.style.stroke = 'white'
      handle.style.strokeWidth = '1px'
      handle.style.pointerEvents = 'all'
      handle.style.cursor = cursor
      svg.appendChild(handle)
      this.handles.push(handle)
    }
  }

  private appendRotateHandle(): void {
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('width', '10px')
    svg.setAttribute('height', '10px')
    svg.style.position = 'absolute'
    svg.style.top = '-25px'
    svg.style.left = '0'
    svg.style.right = '0'
    svg.style.margin = 'auto'
    svg.style.pointerEvents = 'none'

    this.rotationHandle.setAttribute('cx', '50%')
    this.rotationHandle.setAttribute('cy', '50%') // Adjust the cy attribute to move the circle up by 20px
    this.rotationHandle.setAttribute('r', '5px')
    this.rotationHandle.style.fill = '#1E88E5'
    this.rotationHandle.style.stroke = 'white'
    this.rotationHandle.style.strokeWidth = '1px'
    this.rotationHandle.style.pointerEvents = 'all'
    this.rotationHandle.style.cursor = 'grabbing'

    svg.appendChild(this.rotationHandle)
    this.element.appendChild(svg)
  }

  public getHandles(): SVGCircleElement[] {
    return this.handles
  }
  public getRotationHandle(): SVGCircleElement {
    return this.rotationHandle
  }
}

export default HandleManager
