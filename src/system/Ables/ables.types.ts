
export type RulerOrientation = 'horizontal' | 'vertical';
export type RulerPosition = 'top' | 'left' | 'bottom' | 'right';
export type Direction = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'sw' | 'se' | 'nesw'
export interface Position {
    x: number;
    y: number;
}
export interface ShareState {
    dragStartPosition: Position;
    dragMousePosition: Position;
    initialSize: { width: number, height: number}
    initialCenter: { width: number, height: number}
    isDragging: boolean;
    isSelected: boolean;
    isRotating: boolean;
    isResizing: boolean;
}

export interface Transformations {
    translate: { x: number, y: number },
    scale: { x: number, y: number },
    rotate: number,
    skew: { x: number, y: number }
}
