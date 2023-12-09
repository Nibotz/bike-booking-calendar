import { createSlice } from '@reduxjs/toolkit'
import bikeService from '../services/bikes'

const BikeSlice = createSlice({
  name: 'bikes',
  initialState: [],
  reducers: {
    setBikes(state, action) {
      return action.payload
    },
    toggleBikeCheck(state, action) {
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
  return async dispatch => {
    const bikes = await bikeService.getAll()
    bikes.forEach(bike => {
      bike.checked = false
    })
    dispatch(setBikes(bikes))
  }
}

export default BikeSlice.reducer
