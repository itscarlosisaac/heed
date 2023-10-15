import { createSlice } from '@reduxjs/toolkit'

const applicationSlice = createSlice({
  name: 'app_slice',
  initialState: null,
  reducers: {
    test: () => console.log('test')
  },
  extraReducers: () => {}
})
export const ApplicationReducer = applicationSlice.reducer
export const ApplicationActions = applicationSlice.actions
