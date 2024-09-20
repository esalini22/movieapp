import { createSlice } from '@reduxjs/toolkit'

const initialState = ['','','']

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    changeBlog(state, action) {
      return [action.payload, state[1], state[2]]
    },
    changeAuthor(state, action){
      return [state[0], action.payload, state[2]]
    },
    changeUrl(state,action){
      return [state[0], state[1], action.payload]
    },
    resetBlog(state, action) {
      return initialState
    }
  }
})

export const { changeBlog, changeAuthor, changeUrl, resetBlog } = blogSlice.actions
export default blogSlice.reducer