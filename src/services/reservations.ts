import axios from 'axios'
import { NewReservation, Reservation } from '../types'
const baseUrl = 'http://localhost:3001/reservations'

const getAll = async () => {
  const response = await axios.get<Reservation[]>(baseUrl)
  return response.data
}

const create = async (reservation: NewReservation) => {
  const response = await axios.post<Reservation>(baseUrl, reservation)
  return response.data.id
}

const update = async (reservation: Reservation) => {
  await axios.put<Reservation>(`${baseUrl}/${reservation.id}`, reservation)
}

export default { getAll, create, update }
