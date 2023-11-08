export interface AttributeChangedProps {
  name: string
  oldValue: string
  newValue: string
}
export interface Middleware {
  connected?: (host: HTMLElement) => void
  disconnected?: (host: HTMLElement) => void
  attributeChanged?: (host: HTMLElement, data: AttributeChangedProps) => void
}

export interface CustomElementLifecycle {
  connectedCallback?(): void
  disconnectedCallback?(): void
  attributeChangedCallback?(name: string, oldValue: string, newValue: string): void
}

export type CustomConstructor = new (...args: any[]) => HTMLElement & CustomElementLifecycle
