import { useDispatch } from 'react-redux'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { changeReservationStatus } from '../../reducers/reservationReducer'
import { Reservation, ResStatus } from '../../types'
import { statusToColor, statusToText, dateFormat, BikeList } from './utils'

const ReservationEntry = ({ res }: { res: Reservation }) => {
  const dispatch: ThunkDispatch<undefined, void, Action> = useDispatch()

  return (
    <tr>
      <td>{dateFormat(res.date.split('T')[0])}</td>
      <td>{dateFormat(res.start)}</td>
      <td>{dateFormat(res.end)}</td>
      <td>{BikeList(res.bikes)}</td>
      <td>{res.name}</td>
      <td>{res.phone}</td>
      <td>{res.email}</td>
      <td style={{ background: statusToColor(res.status) }}>
        {statusToText(res.status)}
        {res.status === ResStatus.new && <>
          <button onClick={
            () => dispatch(
              changeReservationStatus(res, ResStatus.confirmed)
            )
          }>hyväksy</button>
          <button onClick={
            () => dispatch(
              changeReservationStatus(res, ResStatus.rejected)
            )
          }>hylkää</button>
        </>}
      </td>
      <td>
        <a href={`/res/${res.id}`}>go to page</a>
      </td>
    </tr>
  )
}

export default ReservationEntry