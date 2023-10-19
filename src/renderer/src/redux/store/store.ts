import logger from 'redux-logger'
import { configureStore } from '@reduxjs/toolkit'
import { ApplicationReducer } from '../Application/ApplicationSlice'

const store = configureStore({
  reducer: {
    application: ApplicationReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger)
  }
})

export type AppDispatch = typeof store.dispatch
export type ApplicationRootState = ReturnType<typeof store.getState>
export default store
