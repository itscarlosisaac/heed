import { Middleware } from './MiddlewareManager.types'

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
}
export default MiddlewareManager
