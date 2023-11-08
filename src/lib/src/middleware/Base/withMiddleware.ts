import { CustomConstructor } from './MiddlewareManager.types'
import MiddlewareManager from './MiddlewareManager'

function withMiddleware<T extends CustomConstructor>(
  WithMiddlewareComponent: T,
  middlewareManager: MiddlewareManager
): T {
  return class extends WithMiddlewareComponent {
    constructor(...args: any[]) {
      super(...args)
    }

    connectedCallback(): void {
      if (super.connectedCallback) {
        super.connectedCallback()
      }
      middlewareManager.onConnected(this)
    }

    disconnectedCallback(): void {
      if (super.disconnectedCallback) {
        super.disconnectedCallback()
      }
      middlewareManager.onDisconnected(this)
    }
    attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
      if (super.attributeChangedCallback) {
        super.attributeChangedCallback(name, oldValue, newValue)
      }
      middlewareManager.onAttributeChanged(this, { name, oldValue, newValue })
    }
  }
}

export { withMiddleware }
