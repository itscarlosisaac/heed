import SharedState from './ShareState'

class Rotatable {
  private element: HTMLElement
  private startAngle: number = 0
  private totalRotation: number = 0
  private rotationHandle: SVGCircleElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
  private sharedState: SharedState

  constructor(element: HTMLElement, sharedState: SharedState) {
    this.element = element
    this.sharedState = sharedState
    this.appendRotationHandle()
    this.rotationHandle.addEventListener('mousedown', (e) => this.onMouseDown(e))
    document.addEventListener('mousemove', (e) => this.onMouseMove(e))
    document.addEventListener('mouseup', () => this.onMouseUp())
  }
  private appendRotationHandle(): void {
    const svgNS = 'http://www.w3.org/2000/svg'
    const svg = document.createElementNS(svgNS, 'svg')
    svg.setAttribute('width', '100%')
    svg.setAttribute('height', '100%')
    svg.style.position = 'absolute'
    svg.style.top = '-0px' // Adjust the top position to move the SVG up by 20px
    svg.style.left = '0'
    svg.style.pointerEvents = 'none'

    this.rotationHandle.setAttribute('cx', '50%')
    this.rotationHandle.setAttribute('cy', '50%') // Adjust the cy attribute to move the circle up by 20px
    this.rotationHandle.setAttribute('r', '10')
    this.rotationHandle.style.fill = 'black'
    this.rotationHandle.style.pointerEvents = 'all'

    svg.appendChild(this.rotationHandle)
    this.element.appendChild(svg)
  }

  private onMouseDown(e: MouseEvent): void {
    e.preventDefault()
    if (this.sharedState.isDragging) return
    this.sharedState.isRotating = true
    const rect = this.element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = e.clientX - centerX
    const y = centerY - e.clientY
    this.startAngle = Math.atan2(y, x) * (180 / Math.PI) - this.totalRotation // Store initial angle difference
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.sharedState.isRotating) return
    const rect = this.element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const x = e.clientX - centerX
    const y = centerY - e.clientY
    const currentAngle = Math.atan2(y, x) * (180 / Math.PI)
    this.totalRotation = currentAngle - this.startAngle
    this.element.style.transform = `rotate(${-this.totalRotation}deg)`
  }

  private onMouseUp(): void {
    this.sharedState.isRotating = false
  }
}

export default Rotatable
