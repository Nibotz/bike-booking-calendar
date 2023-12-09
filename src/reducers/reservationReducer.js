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
    }
  }
})

export const { setReservations, addReservation } = reservationSlice.actions

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

export default reservationSlice.reducer
