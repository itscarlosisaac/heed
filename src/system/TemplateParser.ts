interface ParsedData {
  scripts: { content: string; position: string; attributes: Record<string, string> }[]
  styles: { content: string; position: string; attributes: Record<string, string> }[]
  meta: { attributes: Record<string, string>; position: string }[]
  bodyContent: { content: string; position: string }
}
class TemplateParser {
  private readonly parsedData: ParsedData

  constructor() {
    this.parsedData = {
      scripts: [],
      styles: [],
      meta: [],
      bodyContent: { content: '', position: '' }
    }
  }

  // Parse the provided HTML content and extract the desired elements.
  async parse(htmlContent: string): Promise<ParsedData> {
    const domParser = new DOMParser()
    const doc = domParser.parseFromString(htmlContent, 'text/html')
    this.extractScripts(doc)
    this.extractStyles(doc)
    this.extractMetaTags(doc)
    this.extractBodyContent(doc)
    return this.parsedData
  }

  // Extract script tags, their content, attributes, and positions.
  private extractScripts(doc: Document): void {
    const scriptTags = doc.querySelectorAll('script')
    scriptTags.forEach((scriptTag) => {
      const scriptAttributes: Record<string, string> = {}
      for (const attr of scriptTag.attributes) {
        scriptAttributes[attr.name] = attr.value
      }
      this.parsedData.scripts.push({
        content: scriptTag.innerHTML,
        attributes: scriptAttributes,
        position: this.getTagPosition(scriptTag)
      })
    })
  }

  // Extract style tags, their content, attributes, and positions.
  private extractStyles(doc: Document): void {
    const styleTags = doc.querySelectorAll('style')
    styleTags.forEach((styleTag) => {
      const styleAttributes: Record<string, string> = {}
      for (const attr of styleTag.attributes) {
        styleAttributes[attr.name] = attr.value
      }
      this.parsedData.styles.push({
        content: styleTag.innerHTML,
        attributes: styleAttributes,
        position: this.getTagPosition(styleTag)
      })
    })
  }

  // Extract meta tags, their attributes, and their positions.
  private extractMetaTags(doc: Document): void {
    const metaTags = doc.querySelectorAll('meta')
    metaTags.forEach((metaTag) => {
      const metaAttributes: Record<string, string> = {}
      for (const attr of metaTag.attributes) {
        metaAttributes[attr.name] = attr.value
      }
      this.parsedData.meta.push({
        attributes: metaAttributes,
        position: this.getTagPosition(metaTag)
      })
    })
  }

  // Extract the content of the <body> element and its position.
  private extractBodyContent(doc: Document): void {
    const body = doc.body
    if (body) {
      // Create a copy of the body element, excluding style and script tags.
      const bodyClone = body.cloneNode(true) as HTMLElement // Added the casting to prevent unreliable warnings.
      // Removes script tags
      const scriptTags = bodyClone.querySelectorAll('script')
      scriptTags.forEach((scriptTag) => {
        scriptTag.remove()
      })
      // Removes style tags
      const styleTags = bodyClone.querySelectorAll('style')
      styleTags.forEach((styleTag) => {
        styleTag.remove()
      })

      this.parsedData.bodyContent = {
        content: bodyClone.innerHTML,
        position: this.getTagPosition(body)
      }
    }
  }

  // Helper function to get the position of a tag in the DOM tree.
  private getTagPosition(tag: Element): string {
    const path: string[] = []
    while (tag && tag !== tag.ownerDocument.documentElement) {
      path.unshift(this.getNodeNameAndIndex(tag))
      tag = tag.parentNode
    }
    return path.join(' > ')
  }

  // Helper function to get the name and index of a node.
  private getNodeNameAndIndex(node: Element): string {
    let name = node.nodeName
    let index = 1
    const siblings = node.parentNode && node.parentNode.childNodes
    for (let i = 0; i < siblings.length; i++) {
      if (siblings[i] === node) {
        break
      }
      if (siblings[i].nodeName === node.nodeName) {
        index++
      }
    }
    if (index > 1) {
      name += `:nth-of-type(${index})`
    }
    return name
  }
}
export default TemplateParser
