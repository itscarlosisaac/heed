import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'
import { ApplicationReducer } from '../Application/ApplicationSlice'
import { EditorReducer } from '../Editor/EditorSlice.ts'
import { enableMapSet } from 'immer'

enableMapSet()

const store = configureStore({
  reducer: {
    application: ApplicationReducer,
    editor: EditorReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger)
  }
})

export type AppDispatch = typeof store.dispatch
export type ApplicationRootState = ReturnType<typeof store.getState>
export default store
