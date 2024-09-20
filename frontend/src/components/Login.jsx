import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import movieService from '../services/movies'
import loginService from '../services/login'
import { errorNotificationChange, errorNotificationReset } from '../reducers/errorNotificationReducers'
import { changeUser } from '../reducers/loginReducers'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const login = useSelector(state => state.login)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedMovieappUser', JSON.stringify(user))
      movieService.setToken(user.token)
      dispatch(changeUser({ username: user.username, favoriteMovies: user.favoriteMovies }))
      setUsername('')
      setPassword('')

      navigate('/')

    } catch (exception) {
      dispatch(errorNotificationChange('Wrong credentials'))
      setTimeout(() => {
        dispatch(errorNotificationReset())
      }, 5000)
    }
  }

  return (
    login === null ?
      <div>
        <br className="top-page"/>
        <h2>login</h2>
        <form onSubmit={handleLogin}>
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
            login
            </Button>
          </div>
        </form>
      </div>
      : <Navigate to="/"/>
  )
}

export default Login