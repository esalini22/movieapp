import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const userListSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    changeUserList(state, action) {
      return action.payload
    },
    resetUserList(state, action) {
      return initialState
    }
  }
})

export const { changeUserList, resetUserList } = userListSlice.actions
export default userListSlice.reducer