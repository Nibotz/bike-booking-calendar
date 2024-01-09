import { render } from 'preact'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './app.tsx'
import './index.css'

import bikeAppReducer from './reducers/bikeAppState.ts'

const store = configureStore({
  reducer: {
    bikeApp: bikeAppReducer,
  }
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')!
)
