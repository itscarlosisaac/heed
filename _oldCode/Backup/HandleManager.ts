import SharedState from './ShareState'

class HandleManager {
  private element: HTMLElement
  private handles: SVGRectElement[] = []
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
      { x: '0%', y: '0%', position: 'top-left' },
      { x: '50%', y: '0%', position: 'top-center' },
      { x: '100%', y: '0%', position: 'top-right' },
      { x: '0%', y: '50%', position: 'middle-left' },
      { x: '100%', y: '50%', position: 'middle-right' },
      { x: '0%', y: '100%', position: 'bottom-left' },
      { x: '50%', y: '100%', position: 'bottom-center' },
      { x: '100%', y: '100%', position: 'bottom-right' }
    ]

    for (const { x, y, position } of positions) {
      const handle = document.createElementNS(svgNS, 'rect')
      handle.setAttribute('x', x)
      handle.setAttribute('y', y)
      handle.setAttribute('width', '10')
      handle.setAttribute('height', '10')
      handle.setAttribute('transform', 'translate(-5, -5)')
      handle.setAttribute('data-position', position) // Setting data-position attribute
      handle.style.fill = 'black'
      handle.style.pointerEvents = 'all'
      svg.appendChild(handle)
      this.handles.push(handle)
    }
  }

  public getHandles(): SVGRectElement[] {
    return this.handles
  }
}

export default HandleManager
