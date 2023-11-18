export class RotateBound {
    private parent: HTMLElement;
    private handler: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this.setup();
    }

    private setup() {
        this.handler = document.createElement('div');
        this.handler.style.width = '8px';
        this.handler.style.height = '8px';
        this.handler.style.border = '1px solid white';
        this.handler.style.borderRadius = '1000px';
        this.handler.style.background = '#4af';
        this.handler.style.position = 'absolute';
        this.handler.style.zIndex = '1000000';
        this.handler.style.margin = 'auto';
        this.handler.style.cursor = 'pointer';

        const offset = '16px';
        this.handler.style.top = `-${offset}`;
        this.handler.style.left = '0';
        this.handler.style.right = '0';

        // Attaching handler to parent.
        this.parent.appendChild(this.handler);
    }
}