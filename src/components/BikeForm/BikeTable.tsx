import { useDispatch, } from 'react-redux'
import { toggleBikeCheck } from '../../reducers/bikeReducer'
import { Bike } from '../../types'
import { Table } from '../utils/Table'


const BikeEntry = (
  { bike, checkLock, isReserved }:
  { bike: Bike, checkLock: boolean, isReserved: boolean }) => 
{
  const dispatch = useDispatch()
  return (
    <tr>
      <td>{bike.id + 1}</td>
      <td>{bike.size}</td>
      <td>{bike.color}</td>
      <td>{bike.model}</td>
      <td className={isReserved ? 'bike-reserved' : 'bike-free'}>
        {isReserved ? 'varattu' : 'vapaana'}
      </td>
      <td>
        <input
          type="checkbox"
          disabled={checkLock || isReserved}
          checked={bike.checked}
          onChange={() => dispatch(toggleBikeCheck(bike))}
        />
      </td>
    </tr>
  )
}

const BikeTable = (
  { bikes, start, end, isReserved }:
  { bikes: Bike[], start: string, end: string, isReserved: (b: Bike) => boolean }) =>
{
  return (
    <Table columns={['pyörä', 'koko', 'väri', 'malli', 'tila', 'valitse']}>
      {bikes.map(b => (
        <BikeEntry
          key={b.id}
          bike={b}
          checkLock={!start || !end}
          isReserved={isReserved(b)}
        />
      ))}
    </Table>
  )
}

export default BikeTable