import { DesignElement } from '../../shared/types/DesignElements/DesignElement'

class DesignConverter {
  static convertToHTMLFormat(design: DesignElement): string {
    const stack: { design: DesignElement; parent: string | null }[] = []
    stack.push({ design, parent: null })
    let html = ''

    while (stack.length > 0) {
      const { design } = stack.pop() as { design: DesignElement; parent: string | null }

      // Add the opening tag
      html += `<${design.type}`

      if (design.styles) {
        const styleString = Object.entries(design.styles)
          .map(([key, value]) => `${key}: ${value}`)
          .join('; ')
        html += ` style="${styleString}"`
      }

      if (design.attributes) {
        for (const [key, value] of Object.entries(design.attributes)) {
          html += ` ${key}="${value}"`
        }
      }

      html += '>'

      if (design.content) {
        html += design.content
      }

      // If there are children, add them to the stack
      if (design.children && design.children.length > 0) {
        for (let i = design.children.length - 1; i >= 0; i--) {
          stack.push({ design: design.children[i], parent: design.type })
        }
      } else {
        // Close the tag if there are no children
        html += `</${design.type}>`
      }
    }

    // Close the root tag
    html += `</${design.type}>`

    return html
  }

  // The fromHTML method remains the same as in the previous response.
  static convertToHeedFormat(htmlString: string): DesignElement {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html')
    const root = doc.body.firstElementChild as HTMLElement

    if (!root) {
      throw new Error('Invalid HTML string')
    }

    return this.convertElementToDesign(root)
  }
  // Convert the HTML file to a Heed Format
  private static convertElementToDesign(element: HTMLElement): DesignElement {
    const designElement: DesignElement = {
      type: element.tagName.toLowerCase()
    }

    // Parses the Styles.
    if (element.style.cssText) {
      designElement.styles = this.parseStyles(element.style.cssText)
    }

    // Parses the data set of the tag.
    // if (element.dataset) {
    //   for (const [key, val] of Object.entries(element.dataset)) {
    //     designElement[`data-${key}`] = val
    //   }
    // }

    if (element.attributes.length > 0) {
      for (const [key, val] of Object.entries(element.attributes)) {
        designElement[`${key}`] = val
      }
    }

    if (element.children.length === 1 && element.children[0] instanceof Text) {
      designElement.content = element.textContent || undefined
    } else if (element.children.length > 0) {
      designElement.children = Array.from(element.children).map((child) =>
        this.convertElementToDesign(child as HTMLElement)
      )
    }

    return designElement
  }
  // Parse the Styles from the given tag.
  private static parseStyles(styleText: string): { [key: string]: string } {
    const styles: { [key: string]: string } = {}
    const stylePairs = styleText.split(';')
    for (const pair of stylePairs) {
      const [key, value] = pair.split(':').map((s) => s.trim())
      if (key && value) {
        styles[key] = value
      }
    }
    return styles
  }
}
const design: DesignElement = {
  type: 'div',
  styles: { 'background-color': 'red' },
  attributes: {
    'data-text': 'My content',
    'data-value': 'my super value'
  },
  children: [
    {
      type: 'p',
      styles: { color: 'white' },
      content: 'Hello World'
    },
    {
      type: 'p',
      styles: { color: 'green' },
      content: 'Hello Again'
    },
    {
      type: 'img',
      attributes: {
        class: 'dede',
        src: 'https://shiftmag.dev/wp-content/uploads/2023/10/Frontend-framework.png?x17579'
      }
    }
  ]
}

export { DesignConverter, design }
