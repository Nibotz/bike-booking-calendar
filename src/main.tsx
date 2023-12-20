import { render } from 'preact'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './app.tsx'
import './index.css'

import bikeReducer from './reducers/bikeReducer.js'
import reservationReducer from './reducers/reservationReducer.js'

const store = configureStore({
  reducer: {
    bikes: bikeReducer,
    reservations: reservationReducer
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')!
)
