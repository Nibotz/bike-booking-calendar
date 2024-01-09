import { Reservation } from '../../types'

export const getCurrentDay = () => (new Date()).toISOString().split('T')[0]

export const getActiveReservations = (reservations: Reservation[]): Reservation[] => {
  const currentDay = getCurrentDay()
  return reservations
    .filter(res => (
      res.status !== 'rejected' &&
      res.status !== 'returned' &&
      res.end >= currentDay
    ))
}
