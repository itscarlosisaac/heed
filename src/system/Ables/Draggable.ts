import {ShareState} from './ables.types';
import {AppErrorCode} from "../Error/AppError.types.ts";
import AppError from "../Error/AppError.ts";
class Draggable {
    boundingBox: HTMLElement;
    selectedElement: HTMLElement | null = null;
    state: ShareState;

    constructor(boundingBox: HTMLElement, state: ShareState) {
        this.boundingBox = boundingBox;
        this.state = state;

        this.onDragStart = this.onDragStart.bind(this);
        this.onDragMove = this.onDragMove.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);

        this.boundingBox.addEventListener('mousedown', this.onDragStart);
    }

    onAttachDrag(element: HTMLElement) {
        this.selectedElement = element;
    }

    onDragStart(e: MouseEvent) {
        if( !this.selectedElement ) {
            throw new AppError(AppErrorCode.ElementNotFound, "Unable to find selected element on  drag start.")
        }

        this.boundingBox.style.cursor = "grabbing"
        this.state.isDragging = true;

        this.state.dragStartPosition.x = this.selectedElement.offsetLeft;
        this.state.dragStartPosition.y = this.selectedElement.offsetTop;

        this.state.dragMousePosition.x = e.clientX;
        this.state.dragMousePosition.y = e.clientY;

        document.addEventListener('mousemove', this.onDragMove);
        document.addEventListener('mouseup', this.onDragEnd);

        // Repositioning the bounding box
        this.boundingBox.style.transform = '';
        const rect = this.selectedElement.getBoundingClientRect();
        this.moveElement(this.boundingBox, rect.left, rect.top)
    }

    onDragMove(e: MouseEvent) {
        if (!this.state.isDragging) return;

        requestAnimationFrame(() => {

            if( !this.selectedElement ) {
                throw new AppError(AppErrorCode.ElementNotFound, "Unable to find selected element on  drag move.")
            }

            this.moveElement(
                this.selectedElement,
                this.state.dragStartPosition.x + (e.clientX - this.state.dragMousePosition.x),
                this.state.dragStartPosition.y + (e.clientY - this.state.dragMousePosition.y)
            );

            this.boundingBox.style.transform = `
                translate(${ e.clientX - this.state.dragMousePosition.x}px,
                ${e.clientY - this.state.dragMousePosition.y}px)
            `;

            // Dispatch a custom event to notify that the element has been moved
            const dragMove = new CustomEvent('dragMove', {
                detail: { element: this.selectedElement },
            });
            this.boundingBox.dispatchEvent(dragMove);
        });
    }

    onDragEnd() {
        this.boundingBox.style.cursor = "grab"
        console.log('Will END drag - move', this);

        this.state.isDragging = false;
        document.removeEventListener('mouseup', this.onDragEnd);
        document.removeEventListener('mousemove', this.onDragMove);
    }

    moveElement(box: HTMLElement, x: number, y: number): void {
        box.style.left = x + 'px';
        box.style.top = y + 'px';
    }
}

export default Draggable;
