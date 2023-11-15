import SharedState from './ShareState'
class Resizable {
  protected element: HTMLElement
  private handles: SVGCircleElement[]
  private sharedState: SharedState
  protected currentResizeDirection = ''

  constructor(element: HTMLElement, handles: SVGCircleElement[], sharedState: SharedState) {
    this.element = element
    this.handles = handles
    this.sharedState = sharedState
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)
    this.attachEventListeners()
  }

  private attachEventListeners(): void {
    this.handles.forEach((handle) => handle.addEventListener('mousedown', this.onMouseDown))
  }
  private onMouseDown(event: MouseEvent): void {
    if (this.sharedState.isRotating || this.sharedState.isDragging) return
    this.sharedState.isResizing = true
    this.resizeHandler(event)
    window.addEventListener('mouseup', this.onMouseUp)
  }

  private getCurrentRotation(): number {
    const styles = window.getComputedStyle(this.element, null)
    const transform =
      styles.getPropertyValue('-webkit-transform') ||
      styles.getPropertyValue('-moz-transform') ||
      styles.getPropertyValue('-ms-transform') ||
      styles.getPropertyValue('-o-transform') ||
      styles.getPropertyValue('transform') ||
      'none'
    if (transform != 'none') {
      const values = transform.split('(')[1].split(')')[0].split(',')
      const angle = Math.round(Math.atan2(Number(values[1]), Number(values[0])) * (180 / Math.PI))
      return angle < 0 ? angle + 360 : angle
    }
    return 0
  }

  private resizeHandler(event: MouseEvent): void {
    this.sharedState.initX = this.element.offsetLeft + this.element.offsetWidth / 2
    this.sharedState.initY = this.element.offsetTop + this.element.offsetHeight / 2

    this.sharedState.mousePressX = event.clientX
    this.sharedState.mousePressY = event.clientY
    this.sharedState.initW = this.element.offsetWidth
    this.sharedState.initH = this.element.offsetHeight

    const target = event.currentTarget as HTMLElement
    this.currentResizeDirection = target.dataset['position'] || ''
    window.addEventListener('mousemove', this.onMouseMove, false)
  }

  private onMouseMove(event: MouseEvent): void {
    const initialRotation = this.getCurrentRotation()
    const initRadians = (initialRotation * Math.PI) / 180
    const cosFraction = Math.cos(initRadians)
    const sinFraction = Math.sin(initRadians)
    const wDiff = event.clientX - this.sharedState.mousePressX
    const hDiff = event.clientY - this.sharedState.mousePressY
    let rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff
    let rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff

    const minHeight = this.sharedState.MIN_WIDTH
    const minWidth = this.sharedState.MIN_HEIGHT

    let newW: number = this.sharedState.initW,
      newH: number = this.sharedState.initH,
      newX: number = this.sharedState.initX,
      newY: number = this.sharedState.initY

    switch (this.currentResizeDirection) {
      // Commented cases.
      case 'top-left':
        newW = this.sharedState.initW - rotatedWDiff
        if (newW < minWidth) {
          newW = minWidth
          rotatedWDiff = this.sharedState.initW - minWidth
        }
        newH = this.sharedState.initH - rotatedHDiff
        if (newH < minHeight) {
          newH = minHeight
          rotatedHDiff = this.sharedState.initH - minHeight
        }
        newX += 0.5 * rotatedWDiff * cosFraction
        newY += 0.5 * rotatedWDiff * sinFraction
        newX -= 0.5 * rotatedHDiff * sinFraction
        newY += 0.5 * rotatedHDiff * cosFraction
        break
      case 'top-right':
        newW = this.sharedState.initW + rotatedWDiff
        if (newW < minWidth) {
          newW = minWidth
          rotatedWDiff = minWidth - this.sharedState.initW
        }
        newH = this.sharedState.initH - rotatedHDiff
        if (newH < minHeight) {
          newH = minHeight
          rotatedHDiff = this.sharedState.initH - minHeight
        }
        newX += 0.5 * rotatedWDiff * cosFraction
        newY += 0.5 * rotatedWDiff * sinFraction
        newX -= 0.5 * rotatedHDiff * sinFraction
        newY += 0.5 * rotatedHDiff * cosFraction
        break
      case 'top-center':
        newH = this.sharedState.initH - rotatedHDiff
        if (newH < minHeight) {
          newH = minHeight
          rotatedHDiff = this.sharedState.initH - minHeight
        }
        newX -= 0.5 * rotatedHDiff * sinFraction
        newY += 0.5 * rotatedHDiff * cosFraction
        break
      case 'bottom-center':
        newH = this.sharedState.initH + rotatedHDiff
        if (newH < minHeight) {
          newH = minHeight
          rotatedHDiff = minHeight - this.sharedState.initH
        }
        newX -= 0.5 * rotatedHDiff * sinFraction
        newY += 0.5 * rotatedHDiff * cosFraction
        break
      case 'bottom-left':
        newW = this.sharedState.initW - rotatedWDiff
        if (newW < 1) {
          newW = minWidth
          rotatedWDiff = minWidth - this.sharedState.initW
        }
        newH = this.sharedState.initH + rotatedHDiff
        if (newH < minHeight) {
          newH = minHeight
          rotatedHDiff = minHeight - this.sharedState.initH
        }
        newX += 0.5 * rotatedWDiff * cosFraction
        newY += 0.5 * rotatedWDiff * sinFraction
        newX -= 0.5 * rotatedHDiff * sinFraction
        newY += 0.5 * rotatedHDiff * cosFraction
        break
      case 'bottom-right':
        newW = this.sharedState.initW + rotatedWDiff
        if (newW < minWidth) {
          newW = minWidth
          rotatedWDiff = minWidth - this.sharedState.initW
        }
        newH = this.sharedState.initH + rotatedHDiff
        if (newH < minHeight) {
          newH = minHeight
          rotatedHDiff = minHeight - this.sharedState.initH
        }
        newX -= 0.5 * rotatedHDiff * sinFraction
        newY += 0.5 * rotatedHDiff * cosFraction
        newX += 0.5 * rotatedWDiff * cosFraction
        newY += 0.5 * rotatedWDiff * sinFraction
        break
      case 'middle-left':
        newW = this.sharedState.initW - rotatedWDiff
        if (newW < minWidth) {
          newW = minWidth
          rotatedWDiff = this.sharedState.initW - minWidth
        }
        newX += 0.5 * rotatedWDiff * cosFraction
        newY += 0.5 * rotatedWDiff * sinFraction
        break
      case 'middle-right':
        newW = this.sharedState.initW + rotatedWDiff
        if (newW < minWidth) {
          newW = minWidth
          rotatedWDiff = minWidth - this.sharedState.initW
        }
        newX += 0.5 * rotatedWDiff * cosFraction
        newY += 0.5 * rotatedWDiff * sinFraction
        break
      default:
        break
    }

    this.sharedState.resizeBox(this.element, newW, newH)
    this.sharedState.repositionElement(
      this.element,
      newX - this.element.offsetWidth / 2,
      newY - this.element.offsetHeight / 2
    )

    this.element.dispatchEvent(new CustomEvent('hd-resized', {
      detail: { state: this.sharedState }
    }))
  }

  private onMouseUp(): void {
    this.sharedState.isResizing = false
    window.removeEventListener('mousemove', this.onMouseMove, false)
    window.removeEventListener('mouseup', this.onMouseUp, false)
  }
}
export default Resizable
