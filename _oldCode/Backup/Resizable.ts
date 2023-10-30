import SharedState from './ShareState'
class Resizable {
  private element: HTMLElement
  private handles: SVGRectElement[]
  private isResizing: boolean = false
  private currentHandle: SVGRectElement | null = null
  private startX: number = 0
  private startY: number = 0
  private startWidth: number = 0
  private startHeight: number = 0
  private initialRotation: number = 0

  constructor(element: HTMLElement, handles: SVGRectElement[]) {
    this.element = element
    this.handles = handles
    this.attachEventListeners()
  }

  private attachEventListeners(): void {
    for (const handle of this.handles) {
      handle.addEventListener('mousedown', (e) => this.onMouseDown(e, handle))
    }
    document.addEventListener('mousemove', (e) => this.onMouseMove(e))
    document.addEventListener('mouseup', () => this.onMouseUp())
  }

  private onMouseDown(e: MouseEvent, handle: SVGRectElement): void {
    e.preventDefault()
    this.isResizing = true
    this.currentHandle = handle
    this.startX = e.clientX
    this.startY = e.clientY
    this.startWidth = this.element.offsetWidth
    this.startHeight = this.element.offsetHeight
    this.initialRotation = this.getCurrentRotation()
  }

  private onMouseMove(e: MouseEvent): void {
    if (!this.isResizing || !this.currentHandle) return

    const position = this.currentHandle.getAttribute('data-position')
    const deltaX = e.clientX - this.startX
    const deltaY = e.clientY - this.startY
    const rotationRadians = this.initialRotation * (Math.PI / 180)
    const cosTheta = Math.cos(rotationRadians)
    const sinTheta = Math.sin(rotationRadians)

    const rotatedDeltaX = cosTheta * deltaX + sinTheta * deltaY
    const rotatedDeltaY = cosTheta * deltaY - sinTheta * deltaX

    let newWidth = this.startWidth
    let newHeight = this.startHeight
    let newX = this.element.offsetLeft
    let newY = this.element.offsetTop

    const isLeft = position.includes('left')
    const isTop = position.includes('top')
    const isXResize = position.includes('left') || position.includes('right')
    const isYResize = position.includes('top') || position.includes('bottom')

    if (isXResize) {
      if (isLeft) {
        newWidth = this.startWidth - rotatedDeltaX
      } else {
        newWidth = this.startWidth + rotatedDeltaX
      }
      newX += 0.5 * rotatedDeltaX * cosTheta
      newY += 0.5 * rotatedDeltaX * sinTheta
    }

    if (isYResize) {
      if (isTop) {
        newHeight = this.startHeight - rotatedDeltaY
      } else {
        newHeight = this.startHeight + rotatedDeltaY
      }
      newX -= 0.5 * rotatedDeltaY * sinTheta
      newY += 0.5 * rotatedDeltaY * cosTheta
    }

    this.resize(newWidth, newHeight)
    this.repositionElement(newX, newY)
  }

  private onMouseUp(): void {
    this.isResizing = false
    this.currentHandle = null
  }

  private getCurrentRotation(): number {
    const st = window.getComputedStyle(this.element, null)
    const transform =
      st.getPropertyValue('-webkit-transform') ||
      st.getPropertyValue('-moz-transform') ||
      st.getPropertyValue('-ms-transform') ||
      st.getPropertyValue('-o-transform') ||
      st.getPropertyValue('transform') ||
      'none'

    if (transform !== 'none') {
      const values = transform.split('(')[1].split(')')[0].split(',')
      const angle = Math.round(
        Math.atan2(parseFloat(values[1]), parseFloat(values[0])) * (180 / Math.PI)
      )
      return angle < 0 ? angle + 360 : angle
    }
    return 0
  }

  private resize(width: number, height: number): void {
    this.element.style.width = width + 'px'
    this.element.style.height = height + 'px'
  }

  private repositionElement(x: number, y: number): void {
    this.element.style.left = x + 'px'
    this.element.style.top = y + 'px'
  }
}
export default Resizable
