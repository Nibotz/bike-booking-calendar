import { Bike } from '../../types'

interface PropTypes {
  bike: Bike,
  isReserved: boolean,
  isValid: boolean,
  isChecked: boolean,
  toggleCheck: () => void
}

const BikeEntry = ({ bike, isReserved, isValid, isChecked, toggleCheck }: PropTypes) => {
  if ((isReserved || !isValid) && isChecked) {
    toggleCheck()
  }
  return (
    <tr>
      <td>{bike.id}</td>
      <td>{bike.size}</td>
      <td>{bike.color}</td>
      <td>{bike.model}</td>
      <td className={isReserved ? 'bike-reserved' : 'bike-free'}>
        {isReserved ? 'varattu' : 'vapaana'}
      </td>
      <td>
        <input
          type="checkbox"
          disabled={isReserved || !isValid}
          checked={isChecked}
          onChange={toggleCheck}
        />
      </td>
    </tr>
  )
}

export default BikeEntry