export class RotateBound {
    private parent: HTMLElement;
    private readonly _handler: HTMLElement;

    constructor(parent: HTMLElement) {
        this.parent = parent;
        this._handler = document.createElement('div');
        this.setup();
    }

    get handler () {
        return this._handler
    }

    private setup() {
        this._handler.style.width = '8px';
        this._handler.style.height = '8px';
        this._handler.style.border = '1px solid white';
        this._handler.style.borderRadius = '1000px';
        this._handler.style.background = '#4af';
        this._handler.style.position = 'absolute';
        this._handler.style.zIndex = '1000000';
        this._handler.style.margin = 'auto';
        this._handler.style.cursor = 'pointer';

        const offset = '16px';
        this._handler.style.top = `-${offset}`;
        this._handler.style.left = '0';
        this._handler.style.right = '0';

        // Attaching handler to parent.
        this.parent.appendChild(this._handler);
    }
}