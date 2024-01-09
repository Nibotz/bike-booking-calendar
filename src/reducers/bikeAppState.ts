import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { Bike, BikeState, Reservation, NewReservation, ResStatus } from '../types'
import bikeService from '../services/bikes'
import reservationService from '../services/reservations'

const initialState: BikeState = {
  bikes: [],
  reservations: []
}

const bikeAppSlice = createSlice({
  name: 'bikeApp',
  initialState,
  reducers: {
    setBikes(state, action: PayloadAction<Bike[]>) {
      state.bikes = action.payload;
    },
    setReservations(state, action: PayloadAction<Reservation[]>) {
      state.reservations = action.payload
    },
    addReservation(state, action: PayloadAction<Reservation>) {
      state.reservations.push(action.payload)
    },
    updateReservation(state, action: PayloadAction<Reservation>) {
      const res = action.payload
      state.reservations = state.reservations
        .map(r => r.id === res.id ? res : r)
    }
  }
})

export const { setBikes, setReservations, addReservation, updateReservation } = bikeAppSlice.actions

export const initialBikes = () => {
  return async (dispatch: Dispatch) => {
    const bikes = await bikeService.getAll()
    dispatch(setBikes(bikes))
  }
}

export const initialReservations = () => {
  return async (dispatch: Dispatch) => {
    const reservations = await reservationService.getAll()
    dispatch(setReservations(reservations))
  }
}

export const makeReservation = (res: NewReservation) => {
  return async (dispatch: Dispatch) => {
    const newId = await reservationService.create(res)
    dispatch(addReservation({ ...res, id: newId }))
  }
}

export const changeReservationStatus = (res: Reservation, newStatus: ResStatus) => {
  return (dispatch: Dispatch) => {
    const newReservation = {
      ...res,
      status: newStatus
    }
    dispatch(updateReservation(newReservation))
    reservationService.update(newReservation)
  }
}

export default bikeAppSlice.reducer
