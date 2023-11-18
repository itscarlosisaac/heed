import {Direction} from "../ables.types";

export class ResizeBound {
    private parent: HTMLElement;
    private handler: HTMLElement;
    private position: Direction = 'n';

    constructor(position: Direction, parent: HTMLElement) {
        this.parent = parent;
        this.position = position;
        this.setup();
    }

    private setup() {
        this.handler = document.createElement('div');
        this.handler.style.width = '6px';
        this.handler.style.height = '6px';
        this.handler.style.border = '1px solid white';
        this.handler.style.borderRadius = '1000px';
        this.handler.style.background = '#4af';
        this.handler.style.position = 'absolute';
        this.handler.style.zIndex = '1000000';
        this.handler.style.margin = 'auto';
        this.handler.style.cursor = 'pointer';

        const offset = '3px';

        switch (this.position) {
            case 'nw':
                this.handler.style.top = `-${offset}`;
                this.handler.style.left = `-${offset}`;
                break;
            case 'n':
                this.handler.style.top = `-${offset}`;
                this.handler.style.left = '0';
                this.handler.style.right = '0';
                break;
            case 'ne':
                this.handler.style.top = `-${offset}`;
                this.handler.style.right = `-${offset}`;
                break;
            case 'e':
                this.handler.style.top = '0px';
                this.handler.style.bottom = '0px';
                this.handler.style.right = `-${offset}`;
                break;
            case 'se':
                this.handler.style.bottom = `-${offset}`;
                this.handler.style.right = `-${offset}`;
                break;
            case 's':
                this.handler.style.bottom = `-${offset}`;
                this.handler.style.left = '0';
                this.handler.style.right = '0';
                break;
            case 'sw':
                this.handler.style.bottom = `-${offset}`;
                this.handler.style.left = `-${offset}`;
                break;
            case 'w':
                this.handler.style.top = '0px';
                this.handler.style.bottom = '0px';
                this.handler.style.left = `-${offset}`;
                break;
        }

        // Attaching handler to parent.
        this.parent.appendChild(this.handler);
    }
}