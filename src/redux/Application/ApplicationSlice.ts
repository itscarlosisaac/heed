import { createSlice } from '@reduxjs/toolkit'
import { ApplicationInitialState } from './ApplicationInitialState'
// import * as AppReducers from './ApplicationReducers'

const applicationSlice = createSlice({
  name: 'app',
  initialState: ApplicationInitialState,
  reducers: {
    UpdateBody: state => { console.log("STATE: ", state)}
  },
  extraReducers: () => {}
})
export const ApplicationReducer = applicationSlice.reducer
export const ApplicationActions = applicationSlice.actions
