class ComponentInstantiator {
  private container: HTMLElement | null = null

  public setContainer(container: HTMLElement): void {
    this.container = container
  }

  // Method to create and append the custom element with a set of attributes.
  public createAndAppendElement(tagName: string, attributes?: Record<string, string>): HTMLElement {
    if (!this.container) {
      throw new Error(`Instantiator needs a container element.`)
    }
    if (!customElements.get(tagName)) {
      throw new Error(`Custom element "${tagName}" is not defined.`)
    }
    const element = document.createElement(tagName)
    for (const attr in attributes) {
      element.setAttribute(attr, attributes[attr])
    }
    this.container.appendChild(element)
    return element
  }
}

export default new ComponentInstantiator()
