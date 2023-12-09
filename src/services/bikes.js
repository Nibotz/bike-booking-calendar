import axios from 'axios'
const baseUrl = 'http://localhost:3001/bikes'

const getAll = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export default { getAll }
