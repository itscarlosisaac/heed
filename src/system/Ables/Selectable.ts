import {ResizeBound} from "./Bounds/ResizeBound";
import {RotateBound} from "./Bounds/RotateBound";
import {LineBound} from "./Bounds/LineBound";
import Draggable from "./Draggable.ts";
import {ShareState} from "./ables.types.ts";
import AppError from "../Error/AppError.ts";
import {AppErrorCode} from "../Error/AppError.types.ts";
import Rotatable from "./Rotatable.ts";
import Resizable from "./Resizable.ts";


class Selectable extends EventTarget {
    boundingBox: HTMLElement;
    private readonly outsideClickListener: (event: MouseEvent) => void;
    private readonly outsideClicker: HTMLElement | null;

    private selectedElement: HTMLElement | null = null;
    private draggable: Draggable;
    private rotatable: Rotatable;
    private resizable: Resizable;

    public state: ShareState = {
        dragStartPosition: { x: 0, y: 0 },
        dragMousePosition: { x: 0, y: 0 },
        initialSize: { width: 0, height: 0 },
        initialCenter: { height: 0, width: 0},
        isResizing: false,
        isDragging: false,
        isSelected: false,
        isRotating: false
    };

    // Constructor to initialize the bounding box
    constructor(selector: string, container: HTMLElement) {
        super();

        // Select the outside click boundaries
        this.outsideClicker = document.querySelector(selector);

        // Create the bounding box element
        this.boundingBox = document.createElement('div');
        this.boundingBox.style.position = 'absolute';
        this.boundingBox.style.willChange = 'transform';
        this.boundingBox.style.zIndex = '999999';
        this.boundingBox.style.visibility = 'hidden';
        this.boundingBox.id = 'bounding-box';

        new LineBound('horizontal', 'top', this.boundingBox);
        new LineBound('horizontal', 'bottom', this.boundingBox);

        new LineBound('vertical', 'left', this.boundingBox);
        new LineBound('vertical', 'right', this.boundingBox);

        const top_left = new ResizeBound('top_left', this.boundingBox);
        const top_right = new ResizeBound('top_right', this.boundingBox);
        const bottom_right = new ResizeBound('bottom_right', this.boundingBox);
        const bottom_left = new ResizeBound('bottom_left', this.boundingBox);

        // new ResizeBound('n', this.boundingBox);
        // new ResizeBound('s', this.boundingBox);
        // new ResizeBound('e', this.boundingBox);
        // new ResizeBound('w', this.boundingBox);

        const rotateHandler = new RotateBound(this.boundingBox);

        // So it doesn't interfere with clicking other elements
        container.appendChild(this.boundingBox);
        this.draggable = new Draggable(this.boundingBox, this.state);

        // Rotate Handler
        this.rotatable = new Rotatable(this.boundingBox, rotateHandler, this.state);

        // Resize Handler
        this.resizable = new Resizable(this.boundingBox, this.state, [
            top_left, top_right, bottom_right, bottom_left
        ])

        // TODO - Fix the de-attach logic
        // The outside element that will handle the click outside the selected element.
        this.outsideClickListener = (event: MouseEvent) => {
            if (
                this.selectedElement &&
                !this.selectedElement.contains(event.target as Node)
            ) {
                // this.detach();
            }
        };
    }

    // Method to move the bounding box to the selected element.
    private moveBox() {
        if( !this.selectedElement ) {
            throw new AppError(AppErrorCode.ElementNotFound, "Unable to find selected element on move box.")
        }
        const computedStyles = getComputedStyle(this.selectedElement);
        this.boundingBox.style.width = computedStyles.width;
        this.boundingBox.style.height = computedStyles.height;

        this.boundingBox.style.left = `${computedStyles.left}`;
        this.boundingBox.style.top = `${computedStyles.top}`;
        this.boundingBox.style.visibility = 'visible';
    }

    // Method to hide the bounding box when unselecting an element.
    private hideBox() {
        this.boundingBox.style.visibility = 'hidden';
    }

    // Method to attach the bounding box to a given HTML element
    public attach(event: MouseEvent, element: HTMLElement): void {
        console.log("Select Event target", event)
        this.state.isSelected = true;
        this.selectedElement = element;

        this.draggable.onAttachDrag(element);
        this.rotatable.onAttachRotatable(element);
        this.resizable.onAttachResizable(element);

        this.draggable.boundingBox.dispatchEvent(
            new MouseEvent('mousedown', event)
        );

        // Logic to calculate and set position and size based on the element's dimensions
        requestAnimationFrame(() => this.moveBox())

        // Dispatch a custom event to notify that an element has been attached
        const attachEvent = new CustomEvent('boundingBoxAttached', {
            detail: { element: this.selectedElement },
        });
        this.dispatchEvent(attachEvent);

        if( !this.outsideClicker ) {
            throw new AppError(AppErrorCode.ElementNotFound, "Unable to find outside clicker element when attaching bounding box.")
        }

        this.outsideClicker.addEventListener(
          'click',
          this.outsideClickListener,
            true
        );
    }

    // Method to detach the bounding box from the currently selected element
    public detach(): void {
        this.state.isSelected = false;
        const detachedElement = this.selectedElement;
        this.selectedElement = null;

        // Dispatch a custom event to notify that the element has been detached
        const detachEvent = new CustomEvent('boundingBoxDetached', {
            detail: { element: detachedElement },
        });
        this.dispatchEvent(detachEvent);
        this.hideBox();

        if( !this.outsideClicker ) {
            throw new AppError(AppErrorCode.ElementNotFound, "Unable to find outside clicker element when de-attaching bounding box.")
        }

        this.outsideClicker.removeEventListener(
          'click',
          this.outsideClickListener,
          true
        );
    }
}

export default Selectable;