import SharedState from './ShareState'

class HandleManager {
  private element: HTMLElement
  private handles: SVGCircleElement[] = []
  protected sharedState: SharedState

  constructor(element: HTMLElement, sharedState: SharedState) {
    this.element = element
    this.sharedState = sharedState
    this.appendHandles()
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

  public getHandles(): SVGCircleElement[] {
    return this.handles
  }
}

export default HandleManager
