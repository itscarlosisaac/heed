import { middlewareManager, withMiddleware } from '../../../middleware'
import { generateUUID } from '../../../utils/utils'

class Hotspot extends HTMLElement {
  private IntermediateElement: HTMLDivElement = document.createElement('div')
  constructor() {
    super()
  }

  connectedCallback(): void {
    this.addEventListener('click', this.onTap)
    this.addEventListener('touchend', this.onTap)
    this.addEventListener('keydown', this.onTap)
    this.setInitialAttributes()
  }

  disconnectedCallback(): void {
    // Remove event listeners
    this.removeEventListener('click', this.onTap)
    this.removeEventListener('touchend', this.onTap)
  }

  setInitialAttributes(): void {
    // TODO: Make a selection to choose touch end or touch start
    // Set initial attributes for accessibility
    this.appendChild(this.IntermediateElement)
    this.IntermediateElement.setAttribute('class', generateUUID())
    this.IntermediateElement.style.border = '1px solid #a8f8b8'
    this.IntermediateElement.style.backgroundColor = '#e1ffe7'
    this.IntermediateElement.style.cursor = 'pointer'
    this.IntermediateElement.style.display = 'block'
    this.IntermediateElement.style.width = '100px'
    this.IntermediateElement.style.height = '100px'
    this.IntermediateElement.setAttribute(
      'aria-label',
      'Interactive element that allows click and tap interactions'
    )
  }

  onTap(): void {
    // Trigger a custom event to notify the click
    const tapEvent = new CustomEvent('tap', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(tapEvent)
  }
}

customElements.define('hd-hotspot', withMiddleware(Hotspot, middlewareManager))

export default Hotspot
