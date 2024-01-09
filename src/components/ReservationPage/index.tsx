import { useSelector } from 'react-redux'
//import { Action, ThunkDispatch } from '@reduxjs/toolkit'
//import { changeReservationStatus } from '../../reducers/reservationReducer'
import { dateFormat, statusToColor, statusToText } from '../Reservations/utils'
import { Bike, BikeState, StoreType } from '../../types'
import { Table } from '../utils/Table'
import './index.css'

const BikeInfo = ({ bike }: { bike: Bike }) => {
  return (
    <tr>
      <td>{bike.id}</td>
      <td>{bike.size}</td>
      <td>{bike.color}</td>
      <td>{bike.model}</td>
    </tr>
  )
}

const ReservationPage = ({ id }: { id: string }) => {
  const { bikes, reservations } = useSelector<StoreType,BikeState>(store => store.bikeApp)

  const res = reservations.find(r => r.id === Number(id))

  if (res === undefined) {
    if (reservations.length) {
      return <div>reservation not found!</div>
    }
    return null
  }

  return (
    <div>
      <div class='bike-res-status' style={{ background: statusToColor(res.status) }}>{statusToText(res.status)}</div>
      <h2>varauksen tiedot</h2>
      <div><span class='bike-highlight'>varauksen tekopäivä:</span> {dateFormat(res.date.split('T')[0])}</div>
      <div><span class='bike-highlight'>hakupäivä:</span> {dateFormat(res.start)}</div>
      <div><span class='bike-highlight'>palautuspäivä:</span> {dateFormat(res.end)}</div>

      <h2>varaajan tiedot</h2>
      <div><span class='bike-highlight'>nimi:</span> {res.name}</div>
      <div><span class='bike-highlight'>puhelin:</span> {res.phone}</div>
      <div><span class='bike-highlight'>email:</span> {res.email}</div>

      <h2>varatut pyörät</h2>
      <Table columns={['pyörä', 'koko', 'väri', 'malli']}>
        {bikes
          .filter(b => res.bikes.includes(b.id))
          .map(b => <BikeInfo key={b.id} bike={b} />)
        }
      </Table>
    </div>
  )
}

export default ReservationPage