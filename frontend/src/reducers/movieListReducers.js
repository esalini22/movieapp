import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const movieListSlice = createSlice({
  name: 'movielist',
  initialState,
  reducers: {
    changeMovieList(state, action) {
      console.log('payload')
      console.log(action.payload)
      return action.payload
    },
    resetMovieList(state, action) {
      return initialState
    }
  }
})

export const { changeMovieList, resetMovieList } = movieListSlice.actions
export default movieListSlice.reducer