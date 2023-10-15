import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { ApplicationReducer } from '../slices/ApplicationSlice'
const store = configureStore({
  reducer: {
    application: ApplicationReducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(logger)
  }
})
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store
