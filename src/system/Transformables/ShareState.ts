class SharedState {
  isDragging: boolean = false
  isRotating: boolean = false
  isResizing: boolean = false
  initX: number = 0
  initY: number = 0
  mousePressX: number = 0
  mousePressY: number = 0
  initW: number = 0
  initH: number = 0
  MIN_WIDTH: number = 5
  MIN_HEIGHT: number = 5

  public repositionElement(box: HTMLElement, x: number, y: number): void {
    box.style.left = x + 'px'
    box.style.top = y + 'px'
  }

  public resizeBox(box: HTMLElement, w: number, h: number): void {
    box.style.width = w + 'px'
    box.style.height = h + 'px'
  }
}

export default SharedState
