import SharedState from './ShareState'

class Rotatable {
  private element: HTMLElement
  private sharedState: SharedState
  private startX: number = 0
  private startY: number = 0

  private rotationHandle: SVGCircleElement = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'circle'
  )

  constructor(element: HTMLElement, sharedState: SharedState) {
    this.element = element
    this.sharedState = sharedState
    this.appendRotationHandle()

    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)

    this.rotationHandle.addEventListener('mousedown', (e) => this.onMouseDown(e))
    document.addEventListener('mousemove', (e) => this.onMouseMove(e))
    document.addEventListener('mouseup', () => this.onMouseUp())
  }
  private appendRotationHandle(): void {
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
    this.rotationHandle.style.cursor =
      "url('https://findicons.com/files/icons/1620/crystal_project/16/rotate_ccw.png'), auto"

    svg.appendChild(this.rotationHandle)
    this.element.appendChild(svg)
  }

  private onMouseDown(event: MouseEvent): void {
    event.preventDefault()
    if (this.sharedState.isDragging || this.sharedState.isResizing) return
    this.sharedState.isRotating = true

    this.sharedState.mousePressX = event.clientX
    this.sharedState.mousePressY = event.clientY

    const boundingBox = this.element.getBoundingClientRect()
    this.startX = boundingBox.left + boundingBox.width / 2
    this.startY = boundingBox.top + boundingBox.height / 2

    this.rotationHandle.addEventListener('mousemove', this.onMouseMove, false)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.sharedState.isRotating) return
    const angle = Math.atan2(event.clientY - this.startY, event.clientX - this.startX) + Math.PI / 2
    const degree = (angle * 180) / Math.PI
    this.element.style.transform = `rotate(${degree}deg)`
  }

  private onMouseUp(): void {
    this.sharedState.isRotating = false
    this.element.removeEventListener('mousemove', this.onMouseMove, false)
    window.removeEventListener('mouseup', this.onMouseUp)
  }
}

export default Rotatable
