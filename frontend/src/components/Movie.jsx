import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import userService from '../services/users'
import { changeUser } from '../reducers/loginReducers'

const Movie = () => {

  const dispatch = useDispatch()

  const location = useLocation()
  const imdbID = location.pathname.substring(8)

  const login = useSelector(state => state.login)
  const movielist = useSelector(state => state.movielist)

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState([])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    //border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const url = 'https://www.imdb.com/title/' + imdbID

  useEffect(() => {
    const movie = movielist.find(m => m.imdbID === imdbID)
    setMovie(movie)
    const stars = []
    for(let i=0; i<parseInt(movie.rating)/2; i++){
      stars.push(<StarIcon key={i}/>)
    }
    setRating(stars)
    setLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleAddFavorite = () => {
    const favoriteMovies = [...login.favoriteMovies, [movie.title, imdbID]]
    userService.updateFavs({ username: login.username, favoriteMovies })
    dispatch(changeUser({ username: login.username, favoriteMovies }))
  }

  const handleRemoveFavorite = () => {
    const favoriteMovies = login.favoriteMovies.filter(f => f[1]!==imdbID)
    userService.updateFavs({ username: login.username, favoriteMovies })
    dispatch(changeUser({ username: login.username, favoriteMovies }))
  }

  return (
    loading===true ?
      <div>Loading...</div> :
      <div style={blogStyle}>
        <br className="top-page"/>
        <h3>{movie.title} ({movie.year})</h3>
        <img src={movie.poster} />
        <p>{movie.summary}</p>
        <div style={{ display: 'flex',alignItems: 'center',flexWrap: 'wrap' }}>
              Rating&nbsp;{rating}
        </div>
        <a href={url}>
          <Button>
              View IMDB page
          </Button>
        </a>
        {login ? login.favoriteMovies.find(f => f[1]===imdbID) ?
          <Button onClick={handleRemoveFavorite}>
            Remove from favorites
          </Button>
          :
          <Button onClick={handleAddFavorite}>
            Add to favorite
          </Button>
          : null}
      </div>
  )
}

export default Movie