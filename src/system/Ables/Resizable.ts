import {Direction, ShareState} from "./ables.types";
import {ResizeBound} from "./Bounds/ResizeBound.ts";


class Resizable {
    protected target: HTMLElement
    protected selectedElement: HTMLElement

    state: ShareState;
    handlers: ResizeBound[] = []
    private direction: Direction;

    constructor(target: HTMLElement, state: ShareState, handlers: ResizeBound[]) {
        this.state = state;
        this.target = target;
        this.handlers = handlers;

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.attachEventListeners()
    }

    private attachEventListeners(): void {
        this.handlers.forEach( (handle) =>
            handle.handler.addEventListener('mousedown', this.onMouseDown))
    }


    onAttachResizable(element: HTMLElement) {
        this.selectedElement = element;
    }

    private handleInitialSetup(event: MouseEvent){
        console.log("Target:", event)
        this.state.initialSize = {
            width: this.target.offsetWidth,
            height: this.target.offsetHeight,
        }

        this.state.initialCenter = {
            width: this.target.offsetLeft + this.target.offsetWidth / 2,
            height: this.target.offsetTop + this.target.offsetHeight / 2,
        }

        this.state.dragStartPosition = {
            x: event.clientX,
            y: event.clientY
        }

        this.direction = event.target.dataset.direction;
    }

    private getCurrentRotation(): number {
        const styles = window.getComputedStyle(this.target, null)
        const transform =
            styles.getPropertyValue('-webkit-transform') ||
            styles.getPropertyValue('-moz-transform') ||
            styles.getPropertyValue('-ms-transform') ||
            styles.getPropertyValue('-o-transform') ||
            styles.getPropertyValue('transform') ||
            'none'
        if (transform != 'none') {
            const values = transform.split('(')[1].split(')')[0].split(',')
            const angle = Math.round(Math.atan2(Number(values[1]), Number(values[0])) * (180 / Math.PI))
            return angle < 0 ? angle + 360 : angle
        }
        return 0
    }

    onMouseDown(event: MouseEvent): void {
        event.stopPropagation()
        this.state.isResizing = true;
        this.handleInitialSetup(event)
        window.addEventListener('mousemove', this.onMouseMove )
        window.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseMove(event: MouseEvent): void  {
        if( !this.state.isResizing ) return;
        console.log("resize direction", this.direction)
        const initialRotation = this.getCurrentRotation()
        const initRadians = (initialRotation * Math.PI) / 180
        const cosFraction = Math.cos(initRadians)
        const sinFraction = Math.sin(initRadians)
        const wDiff = event.clientX - this.state.dragStartPosition.x
        const hDiff = event.clientY - this.state.dragStartPosition.y
        let rotatedWDiff = cosFraction * wDiff + sinFraction * hDiff
        let rotatedHDiff = cosFraction * hDiff - sinFraction * wDiff

        const minHeight = 10
        const minWidth = 10

        let newW: number = this.state.initialSize.width,
            newH: number = this.state.initialSize.height,
            newX: number = this.state.initialCenter.width,
            newY: number = this.state.initialCenter.height

        switch (this.direction) {
            // Commented cases.
            case 'nw':
                newW = this.state.initialSize.width - rotatedWDiff
                if (newW < minWidth) {
                    newW = minWidth
                    rotatedWDiff = this.state.initialSize.width - minWidth
                }
                newH = this.state.initialSize.height - rotatedHDiff
                if (newH < minHeight) {
                    newH = minHeight
                    rotatedHDiff = this.state.initialSize.height - minHeight
                }
                newX += 0.5 * rotatedWDiff * cosFraction
                newY += 0.5 * rotatedWDiff * sinFraction
                newX -= 0.5 * rotatedHDiff * sinFraction
                newY += 0.5 * rotatedHDiff * cosFraction
                break;
            case 'ne':
                newW = this.state.initialSize.width + rotatedWDiff
                if (newW < minWidth) {
                    newW = minWidth
                    rotatedWDiff = minWidth - this.state.initialSize.width
                }
                newH = this.state.initialSize.height - rotatedHDiff
                if (newH < minHeight) {
                    newH = minHeight
                    rotatedHDiff = this.state.initialSize.height - minHeight
                }
                newX += 0.5 * rotatedWDiff * cosFraction
                newY += 0.5 * rotatedWDiff * sinFraction
                newX -= 0.5 * rotatedHDiff * sinFraction
                newY += 0.5 * rotatedHDiff * cosFraction
                break
        }

        this.selectedElement.style.width = newW + "px"
        this.selectedElement.style.height = newH + "px"
        this.selectedElement.style.top = (this.selectedElement.offsetHeight / 2 - newY) + "px"

        this.selectedElement.style.left = (this.selectedElement.offsetWidth / 2 - newX) + "px"

        this.target.style.width = newW + "px"
        this.target.style.height = newH + "px"
        this.target.style.top = (this.target.offsetHeight / 2 - newY) + "px"
        this.target.style.left = (this.target.offsetWidth / 2 - newX) + "px"

    }

    onMouseUp():void {
        this.state.isResizing = false;
        window.removeEventListener('mousemove', this.onMouseMove )
        window.removeEventListener('mouseup', this.onMouseUp)
    }

}

export default Resizable