import withMiddleware from '../../middleware/withMiddleware'
import MiddlewareManager from '../../middleware/ComponentMiddleware'

class BaseComponent extends HTMLElement {
  constructor() {
    super()
  }
}
const middlewareManager = new MiddlewareManager()
// Add middleware
middlewareManager.use({
  connected: (host) => console.log(`Connected: ${host.tagName}`),
  disconnected: (host) => console.log(`Disconnected: ${host.tagName}`)
})

customElements.define('base-component', withMiddleware(BaseComponent, middlewareManager))

export default BaseComponent
