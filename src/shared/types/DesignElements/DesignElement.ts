export interface DesignElement {
  attributes: Record<string, string>
  children?: DesignElement[]
  content?: string
  styles?: { [key: string]: string }
  type: string
}
