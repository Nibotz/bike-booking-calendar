import { useSelector, useDispatch } from 'react-redux'
import { changeReservationStatus } from '../reducers/reservationReducer'

// helper functions
const dateReverse = d => d.split('-').reverse().join('.')

const statusText = text => {
  switch (text) {
    case 'new':
      return 'uusi'
    case 'confirmed':
      return 'hyväksytty'
    case 'rejected':
      return 'hylätty'
    default:
      return text
  }
}

const Reservation = ({ res }) => {
  const dispatch = useDispatch()

  const bikeSelection = res.bikes
    .map((b, i) => (b ? i + 1 : 0))
    .filter(b => b)
    .join(', ')

  const confirm = () => dispatch(changeReservationStatus(res, 'confirmed'))
  const reject = () => dispatch(changeReservationStatus(res, 'rejected'))

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
        {statusText(res.status)}
        {res.status === 'new' && <button onClick={confirm}>hyväksy</button>}
        {res.status === 'new' && <button onClick={reject}>hylkää</button>}
      </td>
    </tr>
  )
}

const ReservationList = () => {
  const reservations = useSelector(state => state.reservations)

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
            <Reservation key={r.id} res={r} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ReservationList
