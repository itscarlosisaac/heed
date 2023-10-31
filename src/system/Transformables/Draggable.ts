import SharedState from './ShareState'

class Draggable {
  private readonly element: HTMLElement
  private readonly sharedState: SharedState

  constructor(element: HTMLElement, sharedState: SharedState) {
    this.element = element
    this.sharedState = sharedState
    this.element.addEventListener('mousedown', (e) => this.onMouseDown(e))
  }

  private onMouseDown(e: MouseEvent): void {
    if (this.sharedState.isRotating || this.sharedState.isResizing) return
    this.sharedState.isDragging = true

    this.sharedState.initX = this.element.offsetLeft
    this.sharedState.initY = this.element.offsetTop
    this.sharedState.mousePressX = e.clientX
    this.sharedState.mousePressY = e.clientY
    this.element.addEventListener('mousemove', (e) => this.onMouseMove(e))
    window.addEventListener('mouseup', () => this.onMouseUp())
  }

  private onMouseMove(event: MouseEvent): void {
    if (!this.sharedState.isDragging) return
    const { initX, initY, mousePressX, mousePressY } = this.sharedState
    this.sharedState.repositionElement(
      this.element,
      initX + (event.clientX - mousePressX),
      initY + (event.clientY - mousePressY)
    )
  }

  private onMouseUp(): void {
    this.sharedState.isDragging = false
    this.element.removeEventListener('mousemove', (e) => this.onMouseMove(e))
    window.removeEventListener('mouseup', () => this.onMouseUp())
  }
}
export default Draggable
