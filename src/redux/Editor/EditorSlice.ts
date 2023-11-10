import { createSlice } from '@reduxjs/toolkit'
import {EditorInitialState} from "./EditorInitialState";

const editorSlice = createSlice({
    name: 'app',
    initialState: EditorInitialState,
    reducers: {
        UpdateBody: state => { console.log("STATE: ", state)}
    },
    extraReducers: () => {}
})
export const EditorReducer = editorSlice.reducer
export const EditorActions = editorSlice.actions
