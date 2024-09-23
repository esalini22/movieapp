import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getMovie = async (id) => {
  const response = await axios.get(`/api/movies/${id}`)
  return response.data
}

const getResults = async () => {
  const response = await axios.get('/api/movies')
  console.log(response.data)
  return response.data
}


export default { getMovie, getResults, setToken }