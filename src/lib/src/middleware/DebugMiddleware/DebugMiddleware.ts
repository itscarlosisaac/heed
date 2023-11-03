import { middlewareManager } from '../Base/ComponentMiddleware'

// Add middleware
middlewareManager.use({
  connected: (host) => console.log(`Connected: ${host.tagName}`),
  disconnected: (host) => console.log(`Disconnected: ${host.tagName}`)
})
