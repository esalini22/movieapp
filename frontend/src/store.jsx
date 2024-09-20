import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducers'
import errorNotificationReducer from './reducers/errorNotificationReducers'
import movieListReducer from './reducers/movieListReducers'
import loginReducer from './reducers/loginReducers'
import userListReducer from './reducers/userListReducers'
import commentReducer from './reducers/commentReducers'
import signupReducer from './reducers/signupReducers'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    errorNotification: errorNotificationReducer,
    movielist: movieListReducer,
    login: loginReducer,
    userlist: userListReducer,
    comment: commentReducer,
    signup: signupReducer,
  }
})

export default store