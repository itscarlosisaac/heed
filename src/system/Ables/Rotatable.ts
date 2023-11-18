import {RotateBound} from "./Bounds/RotateBound.ts";
import {ShareState} from "./ables.types.ts";

class Rotatable {
    private boundingBox: HTMLElement;
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

    onRotateStart(event: MouseEvent): void {
        console.log("Will Rotate",event)
        event.stopPropagation()
        this.state.isRotating = true;

        this.state.dragMousePosition.x = event.clientX;
        this.state.dragMousePosition.y = event.clientY;

        const boundingBox = this.boundingBox.getBoundingClientRect()
        this.state.dragStartPosition.x = boundingBox.left + boundingBox.width / 2
        this.state.dragStartPosition.y = boundingBox.top + boundingBox.height / 2

        document.addEventListener('mousemove', this.onRotate);
        document.addEventListener('mouseup', this.onRotateEnd);
    }
    onRotate(event: MouseEvent): void {
        if( !this.state.isRotating ) return;
        console.log("Rotating", event)
        const angle = Math.atan2(
            event.clientY - this.state.dragStartPosition.y,
            event.clientX - this.state.dragStartPosition.x)
            + Math.PI / 2;

        const degree = (angle * 180) / Math.PI
        this.boundingBox.style.transform = `rotate(${degree}deg)`
    }
    onRotateEnd(e){
        console.log("End Rotate",e)
        this.state.isRotating = false;
        document.removeEventListener('mousemove', this.onRotate);
        document.removeEventListener('mouseup', this.onRotateEnd);
    }


}

export default Rotatable;