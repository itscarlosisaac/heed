const DebugMiddleware = {
  connected: (host: HTMLElement): void => console.log(`Connected: ${host.tagName}`),
  disconnected: (host: HTMLElement): void => console.log(`Disconnected: ${host.tagName}`)
}

export default DebugMiddleware
