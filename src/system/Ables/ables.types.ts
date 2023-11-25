export type RulerOrientation = 'horizontal' | 'vertical';
export type RulerPosition = 'top' | 'left' | 'bottom' | 'right';
export type Direction = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'sw' | 'se' | 'nesw'

export type AnchorPosition = {
    top_left: Point,
    top_right: Point,
    bottom_left: Point,
    bottom_right: Point,
    center: Point
}

export interface Size {
    width: number;
    height: number;
}
export interface Point {
    x: number;
    y: number;
}

export interface ShareState {
    dragStartPosition: Point;
    dragMousePosition: Point;
    initialSize: { width: number, height: number}
    initialCenter: { width: number, height: number}
    initial_coordinates: AnchorPosition
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
