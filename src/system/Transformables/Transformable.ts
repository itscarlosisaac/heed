import Draggable from './Draggable'
import Resizable from './Resizable'
import Rotatable from './Rotatable'
import SharedState from './ShareState'
import HandleManager from './HandleManager'
import Selectable from './Selectable'

class TransformableElement {
  private readonly element: HTMLElement

  private sharedState: SharedState = new SharedState()
  protected draggable: Draggable
  protected rotatable: Rotatable
  protected resizable: Resizable
  protected selectable: Selectable
  private handleManager: HandleManager

  constructor(element: HTMLElement) {
    this.element = element
    this.element.style.position = 'absolute'
    this.element.style.userSelect = 'none'
    this.handleManager = new HandleManager(this.element, this.sharedState)

    this.selectable = new Selectable(
      this.element,
      [...this.handleManager.getHandles(), this.handleManager.getRotationHandle()],
      this.sharedState
    )
    this.rotatable = new Rotatable(
      this.element,
      this.handleManager.getRotationHandle(),
      this.sharedState
    )
    this.draggable = new Draggable(this.element, this.sharedState)
    this.resizable = new Resizable(this.element, this.handleManager.getHandles(), this.sharedState)
  }

  removeHandlers(): void {
    this.element.querySelectorAll('svg').forEach((handler) => handler.remove())
  }
}
export default TransformableElement
