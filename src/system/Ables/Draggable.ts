import {ShareState} from './ables.types';
import {AppErrorCode} from "../Error/AppError.types.ts";
import AppError from "../Error/AppError.ts";
import Transformer from "./Transformer.ts";
import AblesEventFactory from "./Bounds/ables.events.ts";

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

    restartTransforms() {
        // Repositioning the bounding box
        if( !this.selectedElement ) throw new AppError(AppErrorCode.ElementNotFound, "Unable to find selected element")
        const elementTransform = Transformer.parseTransformations(this.selectedElement);
        if( !elementTransform ) throw new AppError(AppErrorCode.TransformParserError, "Unable to parse transformation for selected  element.")
        Transformer.updateRotate(this.boundingBox, elementTransform.rotate || 0)
        Transformer.updateTranslate(this.boundingBox, 0, 0)
    }

    onDragStart(e: MouseEvent) {
        if (!this.selectedElement) {
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

        this.restartTransforms();

        this.moveElement(
            this.boundingBox,
            this.selectedElement.offsetLeft,
            this.selectedElement.offsetTop
        )

        // Dispatch Drag Start Event
        this.boundingBox.dispatchEvent(
            AblesEventFactory.instance.create_event(
                AblesEventFactory.events.drag.started,
                {element: this.selectedElement})
        )    }

    onDragMove(e: MouseEvent) {
        if (!this.state.isDragging) return;

        requestAnimationFrame(() => {

            if (!this.selectedElement) {
                throw new AppError(AppErrorCode.ElementNotFound, "Unable to find selected element on  drag move.")
            }

            this.moveElement(
                this.selectedElement,
                this.state.dragStartPosition.x + (e.clientX - this.state.dragMousePosition.x),
                this.state.dragStartPosition.y + (e.clientY - this.state.dragMousePosition.y)
            );

            this.moveElement(
                this.boundingBox,
                this.selectedElement.offsetLeft,
                this.selectedElement.offsetTop
            )

            // Dispatch a custom event to notify that the element has been moved
            this.boundingBox.dispatchEvent(
                AblesEventFactory.instance.create_event(
                    AblesEventFactory.events.drag.moved,
                    {element: this.selectedElement})
            )
        });
    }

    onDragEnd() {
        this.state.isDragging = false;
        this.boundingBox.style.cursor = "initial"
        document.removeEventListener('mouseup', this.onDragEnd);
        document.removeEventListener('mousemove', this.onDragMove);
        this.boundingBox.dispatchEvent(
            AblesEventFactory.instance.create_event(
                AblesEventFactory.events.drag.ended,
                {element: this.selectedElement})
        )

    }
    
    requestMove(x: number, y: number): void {
        if (!this.selectedElement) {
            throw new AppError(
                AppErrorCode.ElementNotFound,
                'Unable to find selected element to move.'
            );
        }
        
        // Move the selected element to the new position
        this.moveElement(this.selectedElement, x, y);
        
        // Move the bounding box to the same position as the selected element
        this.moveElement(this.boundingBox, x, y);
        
        // Update the state to reflect the new position
        this.state.dragStartPosition.x = x;
        this.state.dragStartPosition.y = y;
    }

    moveElement(box: HTMLElement, x: number, y: number): void {
        box.style.left = x + 'px';
        box.style.top = y + 'px';
    }
}

export default Draggable;
