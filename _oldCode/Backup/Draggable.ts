import SharedState from './ShareState'

class Draggable {
  private element: HTMLElement
  private sharedState: SharedState
  private startX: number = 0
  private startY: number = 0

  constructor(element: HTMLElement, sharedState: SharedState) {
    this.element = element
    this.sharedState = sharedState
    this.element.addEventListener('mousedown', (e) => this.onMouseDown(e))
    document.addEventListener('mousemove', (e) => this.onMouseMove(e))
    document.addEventListener('mouseup', () => this.onMouseUp())
  }

  private onMouseDown(e: MouseEvent): void {
    if (this.sharedState.isRotating || this.sharedState.isResizing) return
    this.sharedState.isDragging = true
    this.startX = e.clientX - this.element.offsetLeft
    this.startY = e.clientY - this.element.offsetTop
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.sharedState.isDragging) return
    const x = e.clientX - this.startX
    const y = e.clientY - this.startY
    this.element.style.left = `${x}px`
    this.element.style.top = `${y}px`
  }

  private onMouseUp(): void {
    this.sharedState.isDragging = false
  }
}
export default Draggable
