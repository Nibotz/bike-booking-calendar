import axios from 'axios'
import { Bike } from '../types'
const baseUrl = 'http://localhost:3001/bikes'

const getAll = async () => {
  const result = await axios.get<Bike[]>(baseUrl)
  return result.data
}

export default { getAll }
