interface Position {
    unit: Unit,
    left: number,
    top: number
}

interface Size {
    unit: Unit
    width: number,
    height: number
}

type Anchor =
    | 'left top'
    | 'left center'
    | 'left bottom'
    | 'right top'
    | 'right center'
    | 'right bottom'
    | 'center top'
    | 'center center'
    | 'center bottom'

type ImageScaling = 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'

type Unit = "px" | "%"

export interface IHeedElement {
    id: string,
    name: string,
    class: string,
    position: Position
    size: Size
    opacity: number
    rotation: number
}

export interface IEditorState {
    elements: HTMLElement[]
    selected: HTMLElement | null
}

export const EditorInitialState: IEditorState = {
    elements: [],
    selected: null
}
