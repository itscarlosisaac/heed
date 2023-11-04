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

  /**
   * Converts an HTML string into a DesignElement object.
   * @param {string} htmlString - The HTML string to convert.
   * @returns {DesignElement} The DesignElement object representation of the HTML content.
   * @throws Will throw an error if the HTML string is empty.
   * @throws Will throw an error if the HTML string is invalid or does not contain a root element.
   */
  static convertToHeedFormat(htmlString: string): DesignElement {
    const doc = new DOMParser().parseFromString(htmlString, 'text/html')
    const root = doc.body.firstElementChild as HTMLElement

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
      type: element.tagName.toLowerCase()
    }

    // Parses the Styles.
    if (element.style.cssText) {
      designElement.styles = this.parseStyles(element.style.cssText)
    }

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

  /**
   * Parses a string of CSS styles into an object.
   * @param {string} styleText - The string containing CSS styles.
   * @returns {{ [key: string]: string }} An object representing the CSS styles.
   * @private
   */
  private static parseStyles(styleText: string): { [key: string]: string } {
    const styles: { [key: string]: string } = {}
    const stylePairs = styleText.split(';')
    for (const pair of stylePairs) {
      const [key, value] = pair.split(':').map((s) => s.trim())

      if (!key || !value) {
        console.warn(`Ignoring malformed style: ${pair}`)
        continue
      }

      if (key && value) {
        styles[key] = value
      }
    }
    return styles
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
