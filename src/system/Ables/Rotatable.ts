import {RotateBound} from "./Bounds/RotateBound.ts";
import {ShareState} from "./ables.types.ts";
import Transformer from "./Transformer.ts";

class Rotatable {
    private boundingBox: HTMLElement;
    private selectedElement: HTMLElement;
    private rotateBound: RotateBound;
    private state: ShareState;
    constructor(boundingBox: HTMLElement, rotateBound: RotateBound, state: ShareState) {
        this.boundingBox = boundingBox;
        this.rotateBound = rotateBound;
        this.state = state;

        this.onRotateStart = this.onRotateStart.bind(this);
        this.onRotate = this.onRotate.bind(this);
        this.onRotateEnd = this.onRotateEnd.bind(this);
        this.rotateBound.handler.addEventListener('mousedown', this.onRotateStart )
    }

    onAttachRotatable(element: HTMLElement) {
        this.selectedElement = element;
    }

    // Repositioning the bounding box
    restartTransforms(){
        const elementTransform = Transformer.parseTransformations(this.selectedElement);
        Transformer.updateRotate(this.boundingBox, elementTransform.rotate)
    }


    onRotateStart(event: MouseEvent): void {
        event.stopPropagation()
        this.state.isRotating = true;

        this.state.dragMousePosition.x = event.clientX;
        this.state.dragMousePosition.y = event.clientY;

        const boundingBox = this.boundingBox.getBoundingClientRect()
        this.state.dragStartPosition.x = boundingBox.left + boundingBox.width / 2
        this.state.dragStartPosition.y = boundingBox.top + boundingBox.height / 2

        document.addEventListener('mousemove', this.onRotate);
        document.addEventListener('mouseup', this.onRotateEnd);

        // Resetting rotation to element.
        this.restartTransforms()
    }
    onRotate(event: MouseEvent): void {
        if( !this.state.isRotating ) return;

        const angle = Math.atan2(
            event.clientY - this.state.dragStartPosition.y,
            event.clientX - this.state.dragStartPosition.x)
            + Math.PI / 2;

        const degree = (angle * 180) / Math.PI
        this.selectedElement.style.transform = `rotate(${degree}deg)`
        Transformer.updateRotate(this.boundingBox, degree)
    }
    onRotateEnd(event){
        this.state.isRotating = false;
        document.removeEventListener('mousemove', this.onRotate);
        document.removeEventListener('mouseup', this.onRotateEnd);
    }


}

export default Rotatable;