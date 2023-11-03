export interface BaseComponentType {
  component_name: string
  disconnectedCallback: VoidFunction
  connectedCallback: VoidFunction
}
