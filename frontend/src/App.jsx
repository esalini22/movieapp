/* eslint-disable react-hooks/exhaustive-deps */

/* armada en stack MERN: mongo express react y node
debe permitir manejar una biblitoeca de peliculas con informacion como nombre, fecha lanzamiento, caratula, sinopsis, puntuacion 1-5 estrellas
debe permitir usar un buscador, debe permitir revisar una pagina con el detalle de la pelicula y un link a IMDB u otro
debe permitir registro y autenticacion
debe consumir API abierta de BD de peliculas para obtener la informacion
debe poder levantarse como servidor desde linux, con instrucciones de como hacerlo */

//usuario puede guardar peliculas en "favoritos" (guardar nombre) - LISTO
//usuario tiene biblioteca de favoritos - LISTO
//usar dataset (con nombre de pelicula y imdbID) y usar solo elementos de dataset para llamadas a API - LISTO
//revisar responsividad de appbar - LISTO
//hacer paginas 404 - LISTO
//devolver a home para paginas sin permiso (favoritos, login, etc) - LISTO
//usar tarjetas en tabla - LISTO

//¿es necesario tener paginas de peliculas en vez de usar solo tarjetas?

//mejorar estilo de pagina 404
//responsividad de appbar cuando resolucion sea muy baja (usar menu sandwich?)
//no permitir usar /api desde navegador
//usar api OMDb para imagen
//poner tarjetas en grid
//cargar informacion csv a mongo y dejar de leer archivo
//interfaz de administracion para agregar peliculas ya sea manual o carga de archivo csv

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
import { resetMovieList } from './reducers/movieListReducers'
import { changeUser, resetUser } from './reducers/loginReducers'
import { changeMovieList } from './reducers/movieListReducers'
import { resetSignUp } from './reducers/signupReducers'
import { Container, AppBar, Button, Toolbar } from '@mui/material'
import Movie from './components/Movie'
import Login from './components/Login'
import Register from './components/Register'
import Favorites from './components/Favorites'
import NotFound from './components/NotFound'

const App = () => {
  const dispatch = useDispatch()
  const movielist = useSelector(state => state.movielist)
  const login = useSelector(state => state.login)
  const signup = useSelector(state => state.signup)

  useEffect(() => {
    movieService
      .getResults()
      .then((movies) =>
        dispatch(changeMovieList(movies))
      )

    const loggedUserJSON = window.localStorage.getItem('loggedMovieappUser')

    if (loggedUserJSON && login===null) {
      const user = JSON.parse(loggedUserJSON)
      movieService.setToken(user.token)
      dispatch(changeUser({ username: user.username, favoriteMovies: user.favoriteMovies }))
      console.log('user:')
      console.log(user)
    }
  }, [])

  const handleLogout = async (event) => {
    window.localStorage.clear()
    movieService.setToken(login.token)
    dispatch(resetUser())
    dispatch(resetMovieList())
  }

  return (
    <Container maxWidth={false}>
      <Router>
        <AppBar maxWidth={false} sx={{ width: '100%', backgroundColor: '#0d253f' }} >
          <Toolbar >
            <Button color="inherit"  onClick={() => dispatch(resetSignUp())}  component={Link} to="/">
              home
            </Button>
            {login === null ? (
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
                <Button color="inherit" component={Link} to="/favorites">
                  favorites
                </Button>
                <Button color="inherit" onClick={handleLogout} component={Link} to="/">
                  logout
                </Button>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Routes>
          <Route path="/" element={<Movies />} />
          {movielist.map((movie) => (
            <Route
              key={movie.imdbID}
              path={`/movies/${movie.imdbID}`}
              element={
                <Movie />
              }
            />
          ))}
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
