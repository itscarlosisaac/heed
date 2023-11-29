import {makeAutoObservable} from "mobx";
import {ChangeEvent} from "react";

class HeedElementManager {
    private _elements: HTMLElement[] = []
    private _selected_element: HTMLElement | null = null;

    private _selected_style: CSSStyleDeclaration | null = null;
    private _selected_attrs: Record<string, string> = {}

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

    public get selected_attributes(){
        return this._selected_attrs;
    }

    public update_id(event: ChangeEvent<HTMLInputElement>) {
        console.log("will change id", event.target.value)
        this._selected_element?.setAttribute(event.target.name, event.target.value);
        this._selected_attrs[event.target.name] =  event.target.value;
    }

    public select(el: HTMLElement | null) {
        if( !el ) {
            return this._selected_element = null
        }
        this._selected_element = el;
        this._selected_style = window.getComputedStyle(el);

        this._selected_attrs = Array.from(el.attributes).reduce((attrs: Record<string, string>, attribute) => {
            attrs[attribute.name] = attribute.value;
            return attrs;
        }, {});
    }

    add_element(el: HTMLElement) {
        this._elements.push(el);
    }

    update_position(target: HTMLElement){
        if( this._selected_element ){
            this._selected_style = window.getComputedStyle(target);
        }
    }

    update_size(target: HTMLElement){
        if( this._selected_element ){
            this._selected_style = window.getComputedStyle(target);
        }
    }

    update_rotation(target: HTMLElement){
        if( this._selected_element ){
            this._selected_style = window.getComputedStyle(target);
        }
    }

    // Actions
    set_move(direction: "left" | "top", position: number){
        if( this._selected_element ){
            this._selected_element.style[direction] = position + "px";
            this._selected_style = window.getComputedStyle(this._selected_element);
        }
    }

    remove_element(el: HTMLElement) {
        this._elements.filter( e => e.id !== el.id);
    }
}

export default new HeedElementManager();