import {Direction} from "../ables.types";

export class ResizeBound {
    private parent: HTMLElement;
    private readonly _handler: HTMLElement = document.createElement('div');
    private readonly position: Direction = 'n';

    constructor(position: Direction, parent: HTMLElement) {
        this.parent = parent;
        this.position = position;
        this.setup();
    }

    get handler(){
        return this._handler
    }

    get direction(){
        return this.position
    }

    private setup() {
        this._handler.style.width = '6px';
        this._handler.style.height = '6px';
        this._handler.style.border = '1px solid white';
        this._handler.style.borderRadius = '1000px';
        this._handler.style.background = '#4af';
        this._handler.style.position = 'absolute';
        this._handler.style.zIndex = '1000000';
        this._handler.style.margin = 'auto';
        this._handler.style.cursor = 'pointer';
        this._handler.dataset.direction = this.position;

        const offset = '3px';

        switch (this.position) {
            case 'nw':
                this._handler.style.top = `-${offset}`;
                this._handler.style.left = `-${offset}`;
                break;
            case 'n':
                this._handler.style.top = `-${offset}`;
                this._handler.style.left = '0';
                this._handler.style.right = '0';
                break;
            case 'ne':
                this._handler.style.top = `-${offset}`;
                this._handler.style.right = `-${offset}`;
                break;
            case 'e':
                this._handler.style.top = '0px';
                this._handler.style.bottom = '0px';
                this._handler.style.right = `-${offset}`;
                break;
            case 'se':
                this._handler.style.bottom = `-${offset}`;
                this._handler.style.right = `-${offset}`;
                break;
            case 's':
                this._handler.style.bottom = `-${offset}`;
                this._handler.style.left = '0';
                this._handler.style.right = '0';
                break;
            case 'sw':
                this._handler.style.bottom = `-${offset}`;
                this._handler.style.left = `-${offset}`;
                break;
            case 'w':
                this._handler.style.top = '0px';
                this._handler.style.bottom = '0px';
                this._handler.style.left = `-${offset}`;
                break;
        }

        // Attaching _handler to parent.
        this.parent.appendChild(this._handler);
    }
}