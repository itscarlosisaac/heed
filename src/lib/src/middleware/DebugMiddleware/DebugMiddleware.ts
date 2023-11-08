import { AttributeChangedProps } from '../Base/MiddlewareManager.types'

const DebugMiddleware = {
  connected: (host: HTMLElement): void => console.log(`Connected: ${host.tagName}`),
  disconnected: (host: HTMLElement): void => console.log(`Disconnected: ${host.tagName}`),
  attributeChanged: (host: HTMLElement, data: AttributeChangedProps): void => {
    console.log(
      `Attribute changed ${host.tagName} ${data.name}: ${data.oldValue} to ${data.newValue}`
    )
  }
}

export default DebugMiddleware
