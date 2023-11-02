import { PaperTypes } from './Paper.types'

class Paper extends HTMLElement implements PaperTypes {
  private readonly component_name
  constructor(name: string) {
    super()
    this.component_name = name
  }
  connectedCallback(): void {
    console.log('Connected', this.component_name)
    this.connected()
  }
  disconnectedCallback(): void {
    console.log('Disconnected', this.component_name)
    this.disconnected()
  }

  connected(): void {}
  disconnected(): void {}
}

export default Paper
