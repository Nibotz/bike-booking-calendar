import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { Reservation, NewReservation, ResStatus } from '../types'
import reservationService from '../services/reservations'

const reservationSlice = createSlice({
  name: 'reservation',
  initialState: [] as Reservation[],
  reducers: {
    setReservations(_state, action: PayloadAction<Reservation[]>) {
      return action.payload
    },
    addReservation(state, action: PayloadAction<Reservation>) {
      return state.concat(action.payload)
    },
    updateReservation(state, action: PayloadAction<Reservation>) {
      const res = action.payload
      return state.map(r => (r.id !== res.id ? r : res))
    }
  }
})

export const { setReservations, addReservation, updateReservation } =
  reservationSlice.actions

export const initialReservations = () => {
  return async (dispatch: Dispatch) => {
    const reservations = await reservationService.getAll()
    dispatch(setReservations(reservations))
  }
}

export const makeReservation = (res: NewReservation) => {
  return async (dispatch: Dispatch) => {
    const newReservation = await reservationService.create(res)
    dispatch(addReservation(newReservation))
  }
}

export const changeReservationStatus = (res: Reservation, newStatus: ResStatus) => {
  return async (dispatch: Dispatch) => {
    const newReservation = await reservationService.update({
      ...res,
      status: newStatus
    })
    dispatch(updateReservation(newReservation))
  }
}

export default reservationSlice.reducer
