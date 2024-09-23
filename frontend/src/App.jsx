/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from 'react-router-dom'
import movieService from './services/movies'
import Movies from './components/Movies'
import { useDispatch, useSelector } from 'react-redux'
//import { resetMovieList } from './reducers/movieListReducers'
import { changeUser, resetUser } from './reducers/userReducers'
import { changeMovieList } from './reducers/movieListReducers'
import { resetSignUp } from './reducers/signupReducers'
import { Container, AppBar, Button, Toolbar } from '@mui/material'
//import Movie from './components/Movie'
import Login from './components/Login'
import Register from './components/Register'
import Favorites from './components/Favorites'
import NotFound from './components/NotFound'

const App = () => {
  const dispatch = useDispatch()
  //const movielist = useSelector(state => state.movielist)
  const user = useSelector(state => state.user)
  const signup = useSelector(state => state.signup)

  useEffect(() => {
    const movies = window.localStorage.getItem('MovieappList')
    if(movies){
      console.log(movies)
      dispatch(changeMovieList(JSON.parse(movies)))
    }
    else{
      movieService
        .getResults()
        .then((movies) => {
          dispatch(changeMovieList(movies))
          window.localStorage.setItem('MovieappList', JSON.stringify(movies))
        })
    }

    const loggedUserJSON = window.localStorage.getItem('loggedMovieappUser')
    if (loggedUserJSON && user===null) {
      const user = JSON.parse(loggedUserJSON)
      //movieService.setToken(user.token)
      dispatch(changeUser({ username: user.username, favoriteMovies: user.favoriteMovies }))
    }
  }, [])

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedMovieappUser')
    //movieService.setToken(login.token)
    dispatch(resetUser())
  }

  return (
    <Container maxWidth={false}>
      <Router>
        <AppBar maxWidth={false} sx={{ width: '100%', backgroundColor: 'white', color: '#1976d2' }} >
          <Toolbar >
            <Button color="inherit"  onClick={() => dispatch(resetSignUp())}  component={Link} to="/">
              home
            </Button>
            {user === null ? (
              <>
                <Button color="inherit"  onClick={() => dispatch(resetSignUp())}  component={Link} to="/login">
                  login
                </Button>
                {signup === false ? (
                  <>
                    <Button color="inherit" component={Link} to="/register">
                      register
                    </Button>
                  </>
                ): null }
              </>
            ) : (
              <>
                {/*<Button color="inherit" component={Link} to="/favorites">
                  favorites
                </Button>*/}
                <Button color="inherit" onClick={handleLogout} component={Link} to="/">
                  logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Movies />} />
          {/*movielist.map((movie) => (
            <Route
              key={movie.imdbID}
              path={`/movies/${movie.imdbID}`}
              element={
                <Movie />
              }
            />
          ))*/}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </Router>
    </Container>
  )
}

export default App
