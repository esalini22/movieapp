/* eslint-disable linebreak-style */
import { useSelector } from 'react-redux'
import Notification from './Notification'
import ErrorNotification from './ErrorNotification'
import { Link, Navigate } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper
} from '@mui/material'

const Favorites = () => {
  const login = useSelector(state => state.login)

  return (
    <div>
      <ErrorNotification />
      <Notification />
      <div>
        { login === null ?
          <Navigate to="/"/> :
          <div>
            <br className="top-page"/>
            <h2>favorite movies</h2>
            {login.favoriteMovies.length===0 ?
              <div>You have no favorite movies</div>
              :
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    {login.favoriteMovies.map((movie) => (
                      <TableRow
                        key={movie[1]}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          <Link key={movie[1]} to={`/movies/${movie[1]}`}>{movie[0]}</Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
          </div>
        }
      </div>
    </div>
  )
}

export default Favorites