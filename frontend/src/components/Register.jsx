/* eslint-disable linebreak-style */
import { useDispatch, useSelector } from 'react-redux'
import userService from '../services/users'
import { errorNotificationChange, errorNotificationReset } from '../reducers/errorNotificationReducers'
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
//import { useNavigate } from 'react-router-dom'
import { succesfulSignUp } from '../reducers/signupReducers'

const Register = () => {
  const dispatch = useDispatch()
  const signup = useSelector(state => state.signup)
  const login = useSelector(state => state.login)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  //const navigate = useNavigate()

  const handleRegister = async (event) => {
    event.preventDefault()

    try {
      await userService.register({
        username,
        password,
      })

      setUsername('')
      setPassword('')

      dispatch(succesfulSignUp()) //que pasa si se cambia de ruta directamente desde la url?

      //navigate('/success')

    } catch (exception) {
      console.log('error')
      dispatch(errorNotificationChange('Wrong credentials'))
      setTimeout(() => {
        dispatch(errorNotificationReset())
      }, 5000)
    }

  }

  if(signup===true){
    return (
      <div>
        <h2>registration completed</h2>
      </div>
    )
  }

  return (
    login === null ?
      <div>
        <br className="top-page"/>
        <h2>register</h2>
        <form onSubmit={handleRegister}>
          <div>
            <TextField label="username" sx={{
              input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
            onChange={(event) => setUsername(event.target.value)}/>
          </div>
          <div>
            <TextField label="password" type='password' sx={{
              input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
            onChange={(event) => setPassword(event.target.value)} />
          </div>
          <br/>
          <div>
            <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#263b53' }}>
            register
            </Button>
          </div>
        </form>
      </div>
      : <Navigate to="/"/>
  )
}

export default Register