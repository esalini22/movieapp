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

  const user = useSelector(state => state.user)
  const movielist = useSelector(state => state.movielist)

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState([])

  const movieStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    //border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const movieTitle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    const favoriteMovies = [...user.favoriteMovies, [movie.title, imdbID]]
    userService.updateFavs({ username: user.username, favoriteMovies })
    dispatch(changeUser({ username: user.username, favoriteMovies }))
  }

  const handleRemoveFavorite = () => {
    const favoriteMovies = user.favoriteMovies.filter(f => f[1]!==imdbID)
    userService.updateFavs({ username: user.username, favoriteMovies })
    dispatch(changeUser({ username: user.username, favoriteMovies }))
  }

  return (
    loading===true ?
      <div>Loading...</div> :
      <div style={movieStyle}>
        <div style={movieTitle}>
          <br className="top-page"/>
          <h2>{movie.title} ({movie.year})</h2>
          <img src={movie.poster} />
        </div>
        <br/>
        <div>
          <p>{movie.summary}</p>
          <br/>
          <div style={{ display: 'flex',alignItems: 'center',flexWrap: 'wrap' }}>
            <strong>Rating</strong>&nbsp;{rating}
          </div>
          <p><strong>Genres:</strong>&nbsp;{movie.genres.join(', ')}</p>
          <p><strong>Directed by:</strong>&nbsp;{movie.director}</p>
          <p><strong>Writers:</strong>&nbsp;{movie.writers.join(', ')}</p>
          <p><strong>Cast:</strong>&nbsp;{movie.cast.join(', ')}</p>
          <br/>
          <a href={url}>
            <Button>
              View IMDB page
            </Button>
          </a>
          {user ? user.favoriteMovies.find(f => f[1]===imdbID) ?
            <Button onClick={handleRemoveFavorite}>
            Remove from favorites
            </Button>
            :
            <Button onClick={handleAddFavorite}>
            Add to favorite
            </Button>
            : null}
        </div>
      </div>
  )
}

export default Movie