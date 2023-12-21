import { useEffect } from 'preact/hooks'
import Router, { Route } from 'preact-router'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { initialBikes } from './reducers/bikeReducer'
import { initialReservations } from './reducers/reservationReducer'
import BikeForm from './components/BikeForm'
import ReservationList from './components/Reservations'
import ReservationPage from './components/ReservationPage'
import ErrorPage from './components/ErrorPage'

const App = () => {
  const dispatch: ThunkDispatch<undefined, void, Action> = useDispatch()

  useEffect(() => {
    dispatch(initialBikes())
    dispatch(initialReservations())
  }, [])

  return (
    <div>
      <h1>pyörien varauskalenteri</h1>
      <Router>
        <Route path='/' component={BikeForm} />
        <Route path='/res' component={ReservationList} />
        <Route path='/res/:id' component={ReservationPage} />
        <Route default component={ErrorPage} />
      </Router>
    </div>
  )
}

export default App
