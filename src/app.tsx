import { useEffect } from 'preact/hooks'
import Router, { Route } from 'preact-router'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { initialBikes, initialReservations } from './reducers/bikeAppState'
import BikeForm from './components/BikeForm'
import ReservationList from './components/Reservations'
import ReservationPage from './components/ReservationPage'

const App = () => {
  const dispatch: ThunkDispatch<undefined, void, Action> = useDispatch()

  useEffect(() => {
    dispatch(initialBikes())
    dispatch(initialReservations())
  }, [])

  return (
    <div class='bike-root'>
      <h1>pyörien varauskalenteri</h1>
      <Router>
        <Route path='/' component={BikeForm} />
        <Route path='/res' component={ReservationList} />
        <Route path='/res/:id' component={ReservationPage} />
      </Router>
    </div>
  )
}

export default App
