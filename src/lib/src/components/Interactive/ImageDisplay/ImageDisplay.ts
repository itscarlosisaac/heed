import { middlewareManager, withMiddleware } from '../../../middleware'
import { generateUUID } from '../../../utils/utils'

class ImageDisplay extends HTMLElement {
  private _imageSrc: string = ''
  private _imageScaling: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down' = 'contain'
  private _imageAnchor:
    | 'left top'
    | 'left center'
    | 'left bottom'
    | 'right top'
    | 'right center'
    | 'right bottom'
    | 'center top'
    | 'center center'
    | 'center bottom' = 'center center'
  private _imageAlt: string = ''
  private _imageName: string = ''
  private IntermediateElement: HTMLDivElement = document.createElement('div')

  constructor() {
    super()
  }

  setInitialAttributes(): void {
    this.appendChild(this.IntermediateElement)
    this.setAttribute('id', generateUUID(`hd-image-display`))
    this.setAttribute('style', 'width:100%;height:100%;display:block')
    this.IntermediateElement.setAttribute(
      'style',
      'width:100%;height:100%;display:block; user-select:none; pointer-events: none'
    )
    this.IntermediateElement.setAttribute('class', generateUUID())
  }

  static get observedAttributes(): string[] {
    return ['image-src', 'image-scaling', 'image-anchor', 'image-alt', 'image-name']
  }

  attributeChangedCallback(name: string, _oldValue: string, newValue: string): void {
    switch (name) {
      case 'image-src':
        this._imageSrc = newValue
        break
      case 'image-scaling':
        this._imageScaling = newValue as 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
        break
      case 'image-anchor':
        this._imageAnchor = newValue as
          | 'left top'
          | 'left center'
          | 'left bottom'
          | 'right top'
          | 'right center'
          | 'right bottom'
          | 'center top'
          | 'center center'
          | 'center bottom'
        break
      case 'image-alt':
        this._imageAlt = newValue
        break
      case 'image-name':
        this._imageName = newValue
        break
    }
    this.updateImage()
  }

  connectedCallback(): void {
    this.setInitialAttributes()
    this.updateImage()
  }

  updateImage(): void {
    this.IntermediateElement.innerHTML = `
      <img src="${this._imageSrc}"
            style="user-select: none;width: 100%; height: 100%; display: block;object-fit: ${this._imageScaling}; object-position: ${this._imageAnchor};"
            alt="${this._imageAlt}"
            title="${this._imageName}" />
    `
    this.appendChild(this.IntermediateElement)
  }

  get imageSrc(): string {
    return this._imageSrc
  }

  set imageSrc(value: string) {
    this.setAttribute('image-src', value)
  }

  get imageScaling(): string {
    return this._imageScaling
  }

  set imageScaling(value: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down') {
    this.setAttribute('image-scaling', value)
  }

  get imageAnchor(): string {
    return this._imageAnchor
  }

  set imageAnchor(
    value:
      | 'left top'
      | 'left center'
      | 'left bottom'
      | 'right top'
      | 'right center'
      | 'right bottom'
      | 'center top'
      | 'center center'
      | 'center bottom'
  ) {
    this.setAttribute('image-anchor', value)
  }

  get imageAlt(): string {
    return this._imageAlt
  }

  set imageAlt(value: string) {
    this.setAttribute('image-alt', value)
  }

  get imageName(): string {
    return this._imageName
  }

  set imageName(value: string) {
    this.setAttribute('image-name', value)
  }
}

customElements.define('hd-image-display', withMiddleware(ImageDisplay, middlewareManager))

export default ImageDisplay
