import axios from 'axios'
const baseUrl = '/api/users'

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const register = async (credentials) => {
  console.log(credentials)
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const updateFavs = async ({ username, favoriteMovies }) => {
  console.log({ username, favoriteMovies })
  const response = await axios.put(baseUrl, { username, favoriteMovies })
  return response.data
}

export default { getAll, register, updateFavs }
