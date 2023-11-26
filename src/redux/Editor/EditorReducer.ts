import {PayloadAction} from "@reduxjs/toolkit";
import {IEditorState, IHeedElement} from "./EditorInitialState";

function AddElement(state: IEditorState, action: PayloadAction<IHeedElement | IHeedElement[]>) {
    const copy = state.elements;
    if( Array.isArray(action.payload) ) {
        state.elements = [...copy, ...action.payload]
        return
    }
    return state.elements = [...copy, action.payload ]
}

function DeleteElement(state: IEditorState, action: PayloadAction<IHeedElement>) {
    state.elements = state.elements.filter(el => el.id !== action.payload.id );
}

function SelectElement(state: IEditorState, action: PayloadAction<IHeedElement>) {
    state.selected = action.payload;
}

export  { AddElement, DeleteElement, SelectElement }