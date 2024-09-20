import { createSlice } from '@reduxjs/toolkit'

const initialState =  null

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeUser(state, action) {
      return action.payload
    },
    resetUser(state, action) {
      return initialState
    }
  }
})

export const { changeUser, resetUser } = loginSlice.actions
export default loginSlice.reducer