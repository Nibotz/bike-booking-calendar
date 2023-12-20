import axios from 'axios'
import { NewReservation, Reservation } from '../types'
const baseUrl = 'http://localhost:3001/reservations'

const getAll = async () => {
  const response = await axios.get<Reservation[]>(baseUrl)
  return response.data
}

const create = async (reservation: NewReservation) => {
  const response = await axios.post<Reservation>(baseUrl, reservation)
  return response.data
}

const update = async (reservation: Reservation) => {
  const response = await axios.put<Reservation>(`${baseUrl}/${reservation.id}`, reservation)
  return response.data
}

export default { getAll, create, update }
