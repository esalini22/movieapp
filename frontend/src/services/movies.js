import axios from 'axios'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getPoster = async (url) => {
  const response = await axios.get(url)
  return response.data
}

const getResults = async () => {
  const response = await axios.get('/api/movies')
  console.log(response.data)
  return response.data
}


export default { getPoster, getResults, setToken }