import { createSlice } from '@reduxjs/toolkit'
import {EditorInitialState} from "./EditorInitialState";
import * as EditorReducers from './EditorReducer.ts';

const editorSlice = createSlice({
    name: 'app',
    initialState: EditorInitialState,
    reducers: EditorReducers,
    extraReducers: () => {}
})
export const EditorReducer = editorSlice.reducer
export const EditorActions = editorSlice.actions
