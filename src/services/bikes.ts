import axios from 'axios'
import { BikeData } from '../types'
const baseUrl = 'http://localhost:3001/bikes'

const getAll = async () => {
  const result = await axios.get<BikeData[]>(baseUrl)
  return result.data
}

export default { getAll }
