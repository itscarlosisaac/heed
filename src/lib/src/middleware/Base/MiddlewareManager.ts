import {AttributeChangedProps, Middleware} from './MiddlewareManager.types'

class MiddlewareManager {
  private middlewares: Middleware[] = []

  use(middleware: Middleware): void {
    this.middlewares.push(middleware)
  }

  onConnected(host: HTMLElement): void {
    for (const middleware of this.middlewares) {
      middleware.connected?.(host)
    }
  }

  onDisconnected(host: HTMLElement): void {
    for (const middleware of this.middlewares) {
      middleware.disconnected?.(host)
    }
  }

  onAttributeChanged(host: HTMLElement, data: AttributeChangedProps): void {
    for (const middleware of this.middlewares) {
      middleware.attributeChanged?.(host, data)
    }
  }
}
export default MiddlewareManager
