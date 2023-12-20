import { useEffect } from 'preact/hooks'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import BikeForm from './components/BikeForm'
import ReservationList from './components/ReservationList'
import { initialBikes } from './reducers/bikeReducer'
import { initialReservations } from './reducers/reservationReducer'

const App = () => {
  const dispatch: ThunkDispatch<undefined, void, Action> = useDispatch()

  useEffect(() => {
    dispatch(initialBikes())
    dispatch(initialReservations())
  }, [])

  return (
    <>
      <h1>pyörien varauskalenteri</h1>
      <BikeForm />
      <ReservationList />
    </>
  )
}

export default App
