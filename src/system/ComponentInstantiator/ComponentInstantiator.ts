class ComponentInstantiator {
  private container: HTMLElement | null = null

  public setContainer(container: HTMLElement): void {
    this.container = container
  }

  // Method to create and append the custom element with a set of attributes.
  public createAndAppendElement(data: {
    tagName: string
    attributes?: Record<string, string>
  }): HTMLElement {
    if (!this.container) {
      throw new Error(`Instantiator needs a container element.`)
    }
    if (!customElements.get(data.tagName)) {
      throw new Error(`Custom element "${data.tagName}" is not defined.`)
    }
    const element = document.createElement(data.tagName)
    for (const attr in data.attributes) {
      element.setAttribute(attr, data.attributes[attr])
    }
    this.container.appendChild(element)
    return element
  }
}

export default new ComponentInstantiator()
