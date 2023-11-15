import {makeAutoObservable} from "mobx";

class HeedElementManager {
    private _elements: HTMLElement[] = []
    private _selected_element: HTMLElement | null = null;

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

    public get selected_position() {
        return this._selected_position
    }

    public get selected_size() {
        return this._selected_size
    }

    public select(el: HTMLElement | null) {
        this._selected_element = el;
    }

    add_element(el: HTMLElement) {
        this._elements.push(el);
    }

    update_position(d: Event){
        // console.log("SELECTED",this._selected_element)
        if( this._selected_element ){
            this._selected_position.left = d.target.style.left
            this._selected_position.top = d.target.style.top
        }
    }

    update_size(d: Event){
        // console.log("SELECTED",this._selected_element)
        if( this._selected_element ){
            this._selected_size.width = d.target.style.width
            this._selected_size.height = d.target.style.height
        }
    }

    remove_element(el: HTMLElement) {
        this._elements.filter( e => e.id !== el.id);
    }
}

export default new HeedElementManager();