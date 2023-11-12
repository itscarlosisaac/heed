import {PayloadAction} from "@reduxjs/toolkit";
import {IEditorState} from "./EditorInitialState";

function AddElement(state: IEditorState, action: PayloadAction<HTMLElement | HTMLElement[]>) {
    const copy = state.elements;
    if( Array.isArray(action.payload) ) {
        state.elements = [...copy, ...action.payload]
        return
    }
    return state.elements = [...copy, action.payload ]
}

function DeleteElement(state: IEditorState, action: PayloadAction<HTMLElement>) {
    state.elements = state.elements.filter(el => el.id !== action.payload.id );
}

function SelectElement(state: IEditorState, action: PayloadAction<HTMLElement>) {
    console.log("Selecting ", action.payload.id)
    state.selected = action.payload;
}
export  { AddElement, DeleteElement, SelectElement }