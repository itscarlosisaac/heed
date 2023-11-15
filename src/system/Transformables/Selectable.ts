import SharedState from './ShareState'

class Selectable {
  protected element: HTMLElement
  private handles: SVGCircleElement[]
  private sharedState: SharedState
  constructor(element: HTMLElement, handles: SVGCircleElement[], sharedState: SharedState) {
    this.element = element
    this.handles = handles
    this.sharedState = sharedState
    this.onUnSelect = this.onUnSelect.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.toggleHandles('hidden')
    this.onInit()
  }

  private onInit(): void {
    this.element.addEventListener('click', this.onSelect)
  }
  public onSelect(event: MouseEvent): void {
    event.stopPropagation()
    if( this.sharedState.isSelected ) return;

    this.sharedState.isSelected = true
    this.toggleHandles('visible')
    window.addEventListener('click', this.onUnSelect)
    this.element.dispatchEvent(new CustomEvent('hd-selected', {
      detail: { state: this.sharedState }
    }))
  }

  public onUnSelect(): void {
    window.removeEventListener('click', this.onUnSelect)
    this.toggleHandles('hidden')
  }

  private toggleHandles(visibility: string): void {
    this.handles.forEach((handle) => (handle.style.visibility = visibility))
  }
}

export default Selectable
