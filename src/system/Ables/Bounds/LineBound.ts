import {RulerOrientation, RulerPosition} from "../ables.types";

export class LineBound {
    private readonly rulerElement: HTMLElement;
    private readonly orientation: RulerOrientation;
    private readonly position: RulerPosition;
    private parent: HTMLElement;

    constructor(
        orientation: RulerOrientation = 'horizontal',
        position: RulerPosition = 'top',
        parent: HTMLElement
    ) {
        this.parent = parent;
        this.orientation = orientation;
        this.position = position;
        this.rulerElement = document.createElement('div');
        this.setupRuler();
    }

    private setupRuler(): void {
        // Basic styling for the ruler
        this.rulerElement.style.position = 'absolute';
        this.rulerElement.style.backgroundColor = '#4af';
        this.rulerElement.style.zIndex = '1000';

        if (this.orientation === 'horizontal') {
            this.rulerElement.style.height = '1px';
            this.rulerElement.style.width = '100%';
            this.rulerElement.style[this.position] = '0';
        } else {
            // vertical
            this.rulerElement.style.width = '1px';
            this.rulerElement.style.height = '100%';
            this.rulerElement.style[this.position] = '0';
        }

        this.parent.appendChild(this.rulerElement);
    }
}