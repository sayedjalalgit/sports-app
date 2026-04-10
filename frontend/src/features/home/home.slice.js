import { createSlice } from '@reduxjs/toolkit'

const homeSlice = createSlice({
  name: 'matches',
  initialState: {
    liveMatches: [],
    fixtures: [],
    standings: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLiveMatches: (state, action) => {
      state.liveMatches = action.payload
    },
    setFixtures: (state, action) => {
      state.fixtures = action.payload
    },
    setStandings: (state, action) => {
      state.standings = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
  },
})

export const { setLiveMatches, setFixtures, setStandings, setLoading, setError } = homeSlice.actions
export default homeSlice.reducer