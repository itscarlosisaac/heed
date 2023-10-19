import { createSlice } from '@reduxjs/toolkit'
import { ApplicationInitialState } from './ApplicationInitialState'

const applicationSlice = createSlice({
  name: 'app_slice',
  initialState: ApplicationInitialState,
  reducers: {
    test: () => console.log('test')
  },
  extraReducers: () => {}
})
export const ApplicationReducer = applicationSlice.reducer
export const ApplicationActions = applicationSlice.actions
