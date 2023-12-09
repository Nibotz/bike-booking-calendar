import { createSlice } from '@reduxjs/toolkit'
import reservationService from '../services/reservations'

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: [],
  reducers: {
    setReservations(state, action) {
      return action.payload
    },
    addReservation(state, action) {
      return state.concat(action.payload)
    },
    updateReservation(state, action) {
      const res = action.payload
      return state.map(r => (r.id !== res.id ? r : res))
    }
  }
})

export const { setReservations, addReservation, updateReservation } =
  reservationSlice.actions

export const initialReservations = () => {
  return async dispatch => {
    const reservations = await reservationService.getAll()
    dispatch(setReservations(reservations))
  }
}

export const makeReservation = res => {
  return async dispatch => {
    const newReservations = await reservationService.create(res)
    dispatch(addReservation(newReservations))
  }
}

export const changeReservationStatus = (res, newStatus) => {
  return async dispatch => {
    const newReservation = await reservationService.update({
      ...res,
      status: newStatus
    })
    dispatch(updateReservation(newReservation))
  }
}

export default reservationSlice.reducer
