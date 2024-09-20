import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    changeComment(state, action) {
      return action.payload
    },
    resetComment(state, action) {
      return initialState
    }
  }
})

export const { changeComment, resetComment } = commentSlice.actions
export default commentSlice.reducer