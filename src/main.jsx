import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import bikeReducer from './reducers/bikeReducer.js'
import reservationReducer from './reducers/reservationReducer.js'

const store = configureStore({
  reducer: {
    bikes: bikeReducer,
    reservations: reservationReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
