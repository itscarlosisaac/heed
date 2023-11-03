import { middlewareManager, withMiddleware } from '../../middleware'

class BaseComponent extends HTMLElement {
  constructor() {
    super()
  }
}

customElements.define('base-component', withMiddleware(BaseComponent, middlewareManager))

export default BaseComponent
