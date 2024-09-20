import { useState } from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'
import ErrorNotification from './ErrorNotification'
import { Link } from 'react-router-dom'
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  Typography
} from '@mui/material'

const Movies = () => {
  const movielist = useSelector(state => state.movielist)

  const [filter, setFilter] = useState('')

  return (
    <div>
      <ErrorNotification />
      <Notification />
      {
        <div>
          <br className="top-page-search"/>
          <div>
            <TextField label="Search" variant="outlined" sx={{
              input: { color: 'white' }, label: { color: 'white' }, fieldset: { borderColor: 'white' } }}
            onChange={() => setFilter(event.target.value)}/>
          </div>
          <br />
          <div>
            <h2>movies</h2>
            <Box sx={{ m: 2 }}>
              {movielist.map((movie) => (
                movie.title.toLowerCase().includes(filter.toLowerCase())===true ?
                  <div key={movie.imdbID}>
                    <Card>
                      <CardContent>
                        <Typography variant="h5" component="div">
                          {movie.title}
                        </Typography>
                        <Typography variant="body2">
                          {movie.year}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" component={Link} to={`/movies/${movie.imdbID}`}>VIEW MORE</Button>
                      </CardActions>
                    </Card>
                    <br />
                  </div>
                  : null
              ))}
            </Box>
          </div>
        </div>
      }
    </div>
  )
}

export default Movies