import axios from 'axios'
const baseUrl = 'http://localhost:3001/reservations'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async reservation => {
  const response = await axios.post(baseUrl, reservation)
  return response.data
}

const update = async reservation => {
  const response = await axios.put(`${baseUrl}/${reservation.id}`, reservation)
  return response.data
}

export default { getAll, create, update }
