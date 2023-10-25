import { heedTapTemplate } from './hd-tap-template'

class HdTap extends HTMLElement {
  private shadow: ShadowRoot
  private button: HTMLButtonElement

  constructor() {
    super()

    // Create a shadow DOM for encapsulation
    this.shadow = this.attachShadow({ mode: 'open' })

    // Clone the template content into the shadow DOM
    this.shadow.appendChild(document.importNode(heedTapTemplate.content, true))

    // Find the button element within the shadow DOM
    this.button = this.shadow.getElementById('button') as HTMLButtonElement

    // Add a click event listener to the button
    this.button.addEventListener('click', this.handleTap.bind(this))
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
