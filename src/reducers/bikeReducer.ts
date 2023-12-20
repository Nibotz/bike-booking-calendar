import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { Bike } from '../types'
import bikeService from '../services/bikes'

const BikeSlice = createSlice({
  name: 'bikes',
  initialState: [] as Bike[],
  reducers: {
    setBikes(_state, action: PayloadAction<Bike[]>) {
      return action.payload
    },
    toggleBikeCheck(state, action: PayloadAction<Bike>) {
      const bike = action.payload
      state[bike.id].checked = !bike.checked
    },
    clearBikeChecks(state) {
      state.forEach(bike => {
        bike.checked = false
      })
    }
  }
})

export const { setBikes, toggleBikeCheck, clearBikeChecks } = BikeSlice.actions

export const initialBikes = () => {
  return async (dispatch: Dispatch) => {
    const bikes = await bikeService.getAll()
    const bikeStates: Bike[] = bikes.map(bike => ({
      ...bike,
      checked: false
    }))
    dispatch(setBikes(bikeStates))
  }
}

export default BikeSlice.reducer
