import Paper from '../../Paper/Paper'
import { PaperTypes } from '../../Paper/Paper.types'

class HdTap extends Paper implements PaperTypes{
  constructor() {
    super('HD-Tap')
  }

  connected(): void {
    // TODO: Make a selection to choose touch end or touch start
    // Adding event listeners for click, touch, and keyboard events
    this.addEventListener('click', this.handleTap)
    this.addEventListener('touchend', this.handleTap)
    this.addEventListener('keydown', this.handleTap)

    // Set initial attributes for accessibility
    this.setAttribute('role', 'button')
    this.setAttribute('tabindex', '0')
    this.style.border = '1px solid #a8f8b8'
    this.style.backgroundColor = '#e1ffe7'
    this.setAttribute('aria-label', 'Interactive element that allows click and tap interactions')
  }
  disconnected(): void {
    // Remove event listeners
    this.removeEventListener('click', this.handleTap)
    this.removeEventListener('touchend', this.handleTap)
    this.removeEventListener('keydown', this.handleTap)
  }

  handleTap(): void {
    // Trigger a custom event to notify the click
    const tapEvent = new CustomEvent('tap', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(tapEvent)
  }
}
// Define the custom element
customElements.define('heed-tap', HdTap)
