export interface Middleware {
  connected?: (host: HTMLElement) => void
  disconnected?: (host: HTMLElement) => void
}

export interface CustomElementLifecycle {
  connectedCallback?(): void
  disconnectedCallback?(): void
}

export type CustomConstructor = new (...args: any[]) => HTMLElement & CustomElementLifecycle
