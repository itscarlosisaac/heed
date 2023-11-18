import {ResizeBound} from "./Bounds/ResizeBound";
import {RotateBound} from "./Bounds/RotateBound";
import {LineBound} from "./Bounds/LineBound";
import Draggable from "./Draggable.ts";
import {ShareState} from "./ables.types.ts";
import AppError from "../Error/AppError.ts";
import {AppErrorCode} from "../Error/AppError.types.ts";
import Rotatable from "./Rotatable.ts";

export default class Selectable extends EventTarget {
    boundingBox: HTMLElement;
    private readonly outsideClickListener: (event: MouseEvent) => void;
    private readonly outsideClicker: HTMLElement | null;

    private selectedElement: HTMLElement | null = null;
    private draggable: Draggable;
    private rotatable: Rotatable;

    public state: ShareState = {
        dragStartPosition: { x: 0, y: 0 },
        dragMousePosition: { x: 0, y: 0 },
        isDragging: false,
        isSelected: false,
        isRotating: false,
    };

    // Constructor to initialize the bounding box
    constructor(selector: string) {
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

        new ResizeBound('n', this.boundingBox);
        new ResizeBound('ne', this.boundingBox);
        new ResizeBound('nw', this.boundingBox);

        new ResizeBound('e', this.boundingBox);
        new ResizeBound('se', this.boundingBox);
        new ResizeBound('s', this.boundingBox);

        new ResizeBound('sw', this.boundingBox);
        new ResizeBound('w', this.boundingBox);

        const rotateHandler = new RotateBound(this.boundingBox);

        // So it doesn't interfere with clicking other elements
        document.body.appendChild(this.boundingBox);
        this.draggable = new Draggable(this.boundingBox, this.state);

        // Rotate Handler
        this.rotatable = new Rotatable(this.boundingBox, rotateHandler, this.state);

        // The outside element that will handle the click outside the selected element.
        this.outsideClickListener = (event: MouseEvent) => {
            if (
                this.selectedElement &&
                !this.selectedElement.contains(event.target as Node)
            ) {
                this.detach();
            }
        };
    }

    // Method to move the bounding box to the selected element.
    private moveBox() {
        if( !this.selectedElement ) {
            throw new AppError(AppErrorCode.ElementNotFound, "Unable to find selected element on move box.")
        }
        const rect = this.selectedElement.getBoundingClientRect();
        console.log("Rect bounds", rect)
        this.boundingBox.style.width = `${rect.width}px`;
        this.boundingBox.style.height = `${rect.height}px`;
        this.boundingBox.style.left = `${rect.left}px`;
        this.boundingBox.style.top = `${rect.top}px`;
        this.boundingBox.style.visibility = 'visible';
    }

    // Method to hide the bounding box when unselecting an element.
    private hideBox() {
        this.boundingBox.style.visibility = 'hidden';
    }

    // Method to attach the bounding box to a given HTML element
    public attach(event: MouseEvent, element: HTMLElement): void {
        this.state.isSelected = true;
        this.selectedElement = element;

        this.draggable.onAttachDrag(element);
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
        // Logic to reset or hide the bounding box

        // Dispatch a custom event to notify that the element has been detached
        const detachEvent = new CustomEvent('boundingBoxDetached', {
            detail: { element: detachedElement },
        });
        this.dispatchEvent(detachEvent);
        this.hideBox();

        if( !this.outsideClicker ) {
            throw new AppError(AppErrorCode.ElementNotFound, "Unable to find outside clicker element when deattaching bounding box.")
        }

        this.outsideClicker.removeEventListener(
          'click',
          this.outsideClickListener,
          true
        );
    }
}