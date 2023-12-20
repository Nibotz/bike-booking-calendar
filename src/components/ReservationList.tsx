import { useSelector, useDispatch } from 'react-redux'
import { changeReservationStatus } from '../reducers/reservationReducer'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { Reservation, Status, StoreType } from '../types'

// helper functions
const dateReverse = (d: string) => d.split('-').reverse().join('.')

const statusToText = (text: Status): string => {
  switch (text) {
    case Status.new:
      return 'uusi'
    case Status.confirmed:
      return 'hyväksytty'
    case Status.rejected:
      return 'hylätty'
    default:
      return text
  }
}

const ReservationEntry = ({ res }: { res: Reservation }) => {
  const dispatch: ThunkDispatch<undefined, void, Action> = useDispatch()

  const bikeSelection = res.bikes
    .map((b, i) => (b ? i + 1 : 0))
    .filter(b => b)
    .join(', ')

  const confirm = () => dispatch(changeReservationStatus(res, Status.confirmed))
  const reject = () => dispatch(changeReservationStatus(res, Status.rejected))

  return (
    <tr>
      <td>{dateReverse(res.date.split('T')[0])}</td>
      <td>{dateReverse(res.start)}</td>
      <td>{dateReverse(res.end)}</td>
      <td>{bikeSelection}</td>
      <td>{res.name}</td>
      <td>{res.phone}</td>
      <td>{res.email}</td>
      <td className={'status-' + res.status}>
        {statusToText(res.status)}
        {res.status === Status.new && <>
          <button onClick={confirm}>hyväksy</button>
          <button onClick={reject}>hylkää</button>
        </>}
      </td>
    </tr>
  )
}

const ReservationList = () => {
  const reservations = useSelector<StoreType, Reservation[]>(state => state.reservations)

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>date</th>
            <th>haku</th>
            <th>palautus</th>
            <th>pyörät</th>
            <th>nimi</th>
            <th>puhelin</th>
            <th>email</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(r => (
            <ReservationEntry key={r.id} res={r} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReservationList
