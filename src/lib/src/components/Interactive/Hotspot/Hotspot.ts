import { middlewareManager, withMiddleware } from '../../../middleware'
import { generateUUID } from '../../../utils/utils'

/**
 * Hotspot is a custom HTML element that extends HTMLElement and is designed to handle click and tap interactions.
 * The element is styled to appear as an interactive area and is accessible with ARIA attributes.
 */
class Hotspot extends HTMLElement {
  /**
   * IntermediateElement is a private HTMLDivElement that acts as a child of the custom element.
   * It is used to provide visual feedback and accessibility features.
   */
  private IntermediateElement: HTMLDivElement = document.createElement('div')
  constructor() {
    super()
  }

  connectedCallback(): void {
    this.addEventListener('click', this.onTap)
    this.addEventListener('touchstart', this.onTap)
    this.setInitialAttributes()
  }

  disconnectedCallback(): void {
    // Remove event listeners
    this.removeEventListener('click', this.onTap)
    this.removeEventListener('touchstart', this.onTap)
  }

  setInitialAttributes(): void {
    // TODO: Make a selection to choose touch end or touch start
    // Set initial attributes for accessibility
    this.appendChild(this.IntermediateElement)
    this.setAttribute('id', generateUUID(`hd-hotspot`))
    this.IntermediateElement.setAttribute('class', generateUUID())
    this.IntermediateElement.style.border = '1px solid #a8f8b8'
    this.IntermediateElement.style.backgroundColor = '#e1ffe7'
    this.IntermediateElement.style.cursor = 'pointer'
    this.IntermediateElement.style.display = 'block'
    this.IntermediateElement.style.width = '100%'
    this.IntermediateElement.style.height = '100%'
    this.IntermediateElement.setAttribute(
      'aria-label',
      'Interactive element that allows click and tap interactions'
    )
  }

  /**
   * onTap is an event handler for click, touchstart events.
   * It dispatches a 'tap' event when the element is interacted with.
   */
  onTap(): void {
    const tapEvent = new CustomEvent('tap', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(tapEvent)
  }
}

customElements.define('hd-hotspot', withMiddleware(Hotspot, middlewareManager))

export default Hotspot
