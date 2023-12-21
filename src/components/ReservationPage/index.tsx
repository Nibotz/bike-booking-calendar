import { useSelector } from 'react-redux'
import { route } from 'preact-router'
//import { Action, ThunkDispatch } from '@reduxjs/toolkit'
//import { changeReservationStatus } from '../../reducers/reservationReducer'
import { dateFormat, statusToColor, statusToText } from '../Reservations/utils'
import { Bike, Reservation, StoreType } from '../../types'
import { Table } from '../utils/Table'

const BikeInfo = ({ bike }: { bike: Bike }) => {
  return (
    <tr>
      <td>{bike.id + 1}</td>
      <td>{bike.size}</td>
      <td>{bike.color}</td>
      <td>{bike.model}</td>
    </tr>
  )
}

const ReservationPage = ({ id }: { id: string }) => {
  const reservations = useSelector<StoreType,Reservation[]>(store => store.reservations)
  const bikes = useSelector<StoreType,Bike[]>(store => store.bikes)

  const res = reservations.find(r => r.id === Number(id))

  if (res === undefined) {
    if (reservations.length) {
      route('/404')
    }
    return null
  }

  // will use actual css files in the future...
  const statusStyle = {
    background: statusToColor(res.status),
    textAlign: 'center',
    width: '10rem',
    border: '2px solid black',
    fontSize: '1.5rem'
  }

  return (
    <div>
      <div style={statusStyle}>{statusToText(res.status)}</div>
      <h2>varauksen tiedot</h2>
      <div><strong>varauksen tekopäivä: </strong>{dateFormat(res.date.split('T')[0])}</div>
      <div><strong>hakupäivä: </strong>{dateFormat(res.start)}</div>
      <div><strong>palautuspäivä: </strong>{dateFormat(res.end)}</div>

      <h2>varaajan tiedot</h2>
      <div><strong>nimi: </strong>{res.name}</div>
      <div><strong>puhelin: </strong>{res.phone}</div>
      <div><strong>email: </strong>{res.email}</div>

      <h2>varatut pyörät</h2>
      <Table columns={['pyörä', 'koko', 'väri', 'malli']}>
        {bikes
          .filter(b => res.bikes[b.id-1])
          .map(b => <BikeInfo key={b.id} bike={b} />)
        }
      </Table>
    </div>
  )
}

export default ReservationPage