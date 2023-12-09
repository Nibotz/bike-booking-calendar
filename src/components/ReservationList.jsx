import { useSelector } from 'react-redux'

const Reservation = ({ res }) => {
  const bikeSelection = res.bikes
    .map((b, i) => (b ? i + 1 : 0))
    .filter(b => b)
    .join(', ')

  return (
    <tr>
      <td>{bikeSelection}</td>
      <td>{res.date}</td>
      <td>{res.start.split('-').reverse().join('.')}</td>
      <td>{res.end.split('-').reverse().join('.')}</td>
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
            <th>pyörät</th>
            <th>aika</th>
            <th>aloitus</th>
            <th>lopetus</th>
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
