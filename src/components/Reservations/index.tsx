import { useSelector } from 'react-redux'
import { Reservation, StoreType } from '../../types'
import ReservationEntry from './Entry'
import { Table } from '../utils/Table'

const ReservationList = () => {
  const reservations = useSelector<StoreType, Reservation[]>(state => state.reservations)

  return (
    <div>
      <Table columns={['date', 'haku', 'palautus', 'pyörät', 'nimi', 'puhelin', 'email', 'status']}>
        {reservations.map(r => (
          <ReservationEntry key={r.id} res={r} />
        ))}
      </Table>
    </div>
  )
}

export default ReservationList
