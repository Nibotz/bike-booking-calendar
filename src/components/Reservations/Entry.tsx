import { useDispatch } from 'react-redux'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { changeReservationStatus } from '../../reducers/bikeAppState'
import { Reservation } from '../../types'
import { statusToColor, dateFormat } from './utils'
import { useState } from 'preact/hooks'

const ReservationEntry = ({ res }: { res: Reservation }) => {
  const dispatch: ThunkDispatch<undefined, void, Action> = useDispatch()
  const [status, setStatus] = useState(res.status)
  
  const changeStatus = (e: any) => {
    const value = e.target.value
    setStatus(value)
    dispatch(changeReservationStatus(res, value))
  }

  const style = {
    background: statusToColor(status)
  }

  return (
    <tr>
      <td>{dateFormat(res.date.split('T')[0])}</td>
      <td>{dateFormat(res.start)}</td>
      <td>{dateFormat(res.end)}</td>
      <td>{res.bikes.join(', ')}</td>
      <td>{res.name}</td>
      <td>{res.phone}</td>
      <td>{res.email}</td>
      <td style={style}>
        <select class='bike-select' style={style} value={status} onChange={changeStatus}>
          <option value='new'>uusi</option>
          <option value='confirmed'>hyväksytty</option>
          <option value='rejected'>hylätty</option>
          <option value='retrieved'>haettu</option>
          <option value='returned'>palautettu</option>
        </select>
      </td>
      <td>
        <a href={`/res/${res.id}`}>go to page</a>
      </td>
    </tr>
  )
}

export default ReservationEntry