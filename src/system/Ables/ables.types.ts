
export type RulerOrientation = 'horizontal' | 'vertical';
export type RulerPosition = 'top' | 'left' | 'bottom' | 'right';
export type Direction = 'n' | 'e' | 's' | 'w' | 'nw' | 'ne' | 'sw' | 'se' | 'nesw';
export interface Position {
    x: number;
    y: number;
}

export interface ShareState {
    dragStartPosition: Position;
    dragMousePosition: Position;
    isDragging: boolean;
    isSelected: boolean;
    isRotating: boolean;
}