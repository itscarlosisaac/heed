import { DesignElement } from '../../shared/types/DesignElements/DesignElement'

/**
 * The DesignConverter class provides static methods to convert between a custom DesignElement object structure and
 * HTML format. It is designed to facilitate the transformation of design elements that have been defined in a
 * JavaScript object notation into valid HTML strings, and vice versa.
 */

class DesignConverter {
  /**
   * Converts a DesignElement object into an HTML string.
   * @param {DesignElement} design - The DesignElement object to convert.
   * @returns {string} The HTML string representation of the design element.
   */
  static convertToHTMLFormat(design: DesignElement): string {
    let html = ''
    const stack: Array<{ design: DesignElement; isClosingTag: boolean }> = []

    // Initially push the root element onto the stack
    stack.push({ design, isClosingTag: false })

    while (stack.length > 0) {
      const { design, isClosingTag } = stack.pop()!

      if (isClosingTag) {
        // Add the closing tag for the element
        html += `</${design.type}>`
      } else {
        // Add the opening tag for the element
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

        // If there are children, push them onto the stack in reverse order
        if (design.children && design.children.length > 0) {
          // Push the closing tag for the current element onto the stack
          stack.push({ design, isClosingTag: true })

          // Then push all children onto the stack
          for (let i = design.children.length - 1; i >= 0; i--) {
            stack.push({ design: design.children[i], isClosingTag: false })
          }
        } else {
          // If there are no children, add the closing tag immediately
          html += `</${design.type}>`
        }
      }
    }

    return html
  }

  /**
   * Converts an HTML string into a DesignElement object.
   * @param {string} htmlString - The HTML string to convert.
   * @param {string} rootSelector - The selector of the root tag.
   * @returns {DesignElement} The DesignElement object representation of the HTML content.
   * @throws Will throw an error if the HTML string is empty.
   * @throws Will throw an error if the HTML string is invalid or does not contain a root element.
   */
  static convertToHeedFormat(htmlString: string, rootSelector: string = 'body'): DesignElement {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html')
    const root = doc.querySelector(rootSelector) as HTMLElement

    if (htmlString.trim() === '') {
      throw new Error('The HTML string cannot be empty.')
    }

    if (root.tagName === 'SCRIPT' || root.tagName === 'STYLE') {
      throw new Error('Cannot convert Script or Style elements to DesignElement.')
    }

    if (!root) {
      throw new Error('Invalid HTML string')
    }

    return this.convertElementToDesign(root)
  }

  /**
   * Converts an HTMLElement into a DesignElement object.
   * @param {HTMLElement} element - The HTMLElement to convert.
   * @returns {DesignElement} The DesignElement object representation of the HTMLElement.
   * @private
   */
  private static convertElementToDesign(element: HTMLElement): DesignElement {
    const designElement: DesignElement = {
      type: element.tagName.toLowerCase(),
      attributes: {}
    }

    if (element.attributes.length > 0) {
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i]
        designElement.attributes[attr.name] = attr.value
      }
    }

    if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
      designElement.content = element.textContent ? element.textContent.trim() : undefined
    } else if (element.children.length > 0) {
      designElement.children = designElement.children = Array.from(element.childNodes)
        .filter((node) => node.nodeType === Node.ELEMENT_NODE)
        .map((child) => this.convertElementToDesign(child as HTMLElement))
    }

    return designElement
  }
}

// Example usage of the DesignConverter class
// const htmlString = DesignConverter.convertToHTMLFormat(myDesignElement);
// const designObject = DesignConverter.convertToHeedFormat('<div style="color: red;">Hello World</div>');

const design: DesignElement = {
  type: 'div',
  styles: { 'background-color': 'red' },
  attributes: {
    'data-text': 'My content',
    'data-value': 'my super value'
  },
  children: [
    {
      attributes: {},
      type: 'p',
      styles: { color: 'white' },
      content: 'Hello World'
    },
    {
      attributes: {},
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

export { DesignConverter }
