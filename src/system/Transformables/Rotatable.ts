import SharedState from './ShareState'

class Rotatable {
  private element: HTMLElement
  private sharedState: SharedState
  private rotationHandle: SVGCircleElement
  private startX: number = 0
  private startY: number = 0

  constructor(element: HTMLElement, rotationHandle: SVGCircleElement, sharedState: SharedState) {
    this.element = element
    this.sharedState = sharedState
    this.rotationHandle = rotationHandle

    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)

    this.rotationHandle.addEventListener('mousedown', (e) => this.onMouseDown(e))
    document.addEventListener('mousemove', (e) => this.onMouseMove(e))
    document.addEventListener('mouseup', () => this.onMouseUp())
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
