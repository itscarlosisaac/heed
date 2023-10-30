import Draggable from './Draggable'
import Resizable from './Resizable'
import Rotatable from './Rotatable'
import SharedState from './ShareState'
import HandleManager from './HandleManager'

class TransformableElement {
  private readonly element: HTMLElement

  private sharedState: SharedState = new SharedState()
  protected draggable: Draggable
  protected rotatable: Rotatable
  protected resizable: Resizable
  private handleManager: HandleManager

  constructor(element: HTMLElement) {
    this.element = element
    this.element.style.position = 'absolute'

    this.draggable = new Draggable(this.element, this.sharedState)
    this.rotatable = new Rotatable(this.element, this.sharedState)
    this.handleManager = new HandleManager(this.element, this.sharedState)
    this.resizable = new Resizable(this.element, this.handleManager.getHandles(), this.sharedState)
  }
}
export default TransformableElement
