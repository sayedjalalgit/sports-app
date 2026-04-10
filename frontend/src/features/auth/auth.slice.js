import { createSlice } from '@reduxjs/toolkit'

const token = localStorage.getItem('token')
const user = JSON.parse(localStorage.getItem('user') || 'null')

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: token || null,
    user: user || null,
    isAuthenticated: !!token,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true
      state.error = null
    },
    loginSuccess: (state, action) => {
      state.loading = false
      state.token = action.payload.token
      state.user = action.payload.user
      state.isAuthenticated = true
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('user', JSON.stringify(action.payload.user))
    },
    loginFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    resetLoading: (state) => {
      state.loading = false
      state.error = null
    },
    logout: (state) => {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, resetLoading, logout } = authSlice.actions
export default authSlice.reducer