/* eslint-disable linebreak-style */
import { createSlice } from '@reduxjs/toolkit'

const initialState = false

const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    succesfulSignUp(state, action) {
      return true
    },
    resetSignUp(state, action) {
      return false
    }
  }
})

export const { succesfulSignUp, resetSignUp } = signupSlice.actions
export default signupSlice.reducer