import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/auth.slice'
import matchReducer from '../features/home/home.slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    matches: matchReducer,
  },
})