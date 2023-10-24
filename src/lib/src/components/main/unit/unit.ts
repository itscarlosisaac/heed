// Import the HTML template
import unitTemplate from './unit-template.ts'

// Define the HeedUnit web component class
import { HeedUnitInterface } from './unit-types'

class HeedUnit extends HTMLElement implements HeedUnitInterface {
  constructor() {
    super()

    // Define and attach the Shadow DOM to encapsulate styles and structure
    const shadow = this.attachShadow({ mode: 'open' })

    // Clone the template content
    const templateContent = document.importNode(unitTemplate.content, true)

    // Append the template content to the Shadow DOM
    shadow.appendChild(templateContent)
  }

  // Define a method to trigger the "page-load" event
  triggerPageLoadEvent(): void {
    const pageLoadEvent = new CustomEvent('page-load', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(pageLoadEvent)
  }

  // Define a method to trigger the "ready-to-present" event
  triggerReadyToPresentEvent(): void {
    const readyToPresentEvent = new CustomEvent('ready-to-present', {
      bubbles: true,
      composed: true
    })
    this.dispatchEvent(readyToPresentEvent)
  }
}

// Define the custom element for HeedUnit
customElements.define('heed-unit', HeedUnit)

// Export the HeedUnit class for use in other TypeScript/JavaScript files
export default HeedUnit
