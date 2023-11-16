import {makeAutoObservable} from "mobx";

class HeedElementManager {
    private _elements: HTMLElement[] = []
    private _selected_element: HTMLElement | null = null;

    private _selected_style: CSSStyleDeclaration | null = null;
    private _selected_size = { width: "", height: "" }
    private _selected_position = { top: "", left: "" }

    constructor() {
        makeAutoObservable(this)
    }

    public get elements(){
        return this._elements
    }

    public get selected_element() {
        return this._selected_element
    }

    public get selected_style(){
        return this._selected_style;
    }

    public get selected_position() {
        return this._selected_position
    }

    public get selected_size() {
        return this._selected_size
    }

    public select(el: HTMLElement | null) {
        if( !el ) {
            return this._selected_element = null
        }
        this._selected_element = el;
        this._selected_style = window.getComputedStyle(el);
    }

    add_element(el: HTMLElement) {
        this._elements.push(el);
    }

    update_position(d: Event){
        if( this._selected_element ){
            this._selected_style = window.getComputedStyle(d.target);
        }
    }

    update_size(d: Event){
        if( this._selected_element ){
            this._selected_style = window.getComputedStyle(d.target);
        }
    }

    remove_element(el: HTMLElement) {
        this._elements.filter( e => e.id !== el.id);
    }
}

export default new HeedElementManager();