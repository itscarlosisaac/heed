import { CustomConstructor } from './MiddlewareManager.types'
import MiddlewareManager from './MiddlewareManager'

function withMiddleware<T extends CustomConstructor>(
  WithMiddlewareComponent: T,
  middlewareManager: MiddlewareManager
): T {
  return class extends WithMiddlewareComponent {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
  }
}

export { withMiddleware }
