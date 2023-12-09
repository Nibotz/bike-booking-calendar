import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { toggleBikeCheck, clearBikeChecks } from '../reducers/bikeReducer'
import { makeReservation } from '../reducers/reservationReducer'

const Bike = ({ bike, checkLock, isReserved }) => {
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

const BikeTable = ({ bikes, start, end, bikeIsReserved }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>pyörä</th>
          <th>koko</th>
          <th>väri</th>
          <th>malli</th>
          <th>tila</th>
          <th>valitse</th>
        </tr>
      </thead>
      <tbody>
        {bikes.map(b => (
          <Bike
            key={b.id}
            bike={b}
            checkLock={!start || !end}
            isReserved={bikeIsReserved(b)}
          />
        ))}
      </tbody>
    </table>
  )
}

const Input = ({ type, lableText, name, value, setValue }) => {
  return (
    <>
      <label htmlFor={'bikeForm-' + name}>{lableText}: </label>
      <input
        id={'bikeForm-' + name}
        name={name}
        type={type}
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <br />
    </>
  )
}

const BikeForm = () => {
  const dispatch = useDispatch()
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const bikes = useSelector(state => state.bikes)

  const reservations = useSelector(state => state.reservations)
  const bikeIsReserved = bike => {
    const start_ = start || end
    const end_ = end || start
    for (const res of reservations) {
      if (res.bikes[bike.id] && start_ <= res.end && end_ >= res.start) {
        return true
      }
    }
    return false
  }

  const validSubmit =
    start && end && name && phone && email && bikes.some(bike => bike.checked)

  const onSubmit = event => {
    event.preventDefault()

    if (!validSubmit) {
      return
    }

    const selectedBikes = bikes.map(
      bike => bike.checked && !bikeIsReserved(bike)
    )
    const newReservation = {
      date: new Date(),
      start,
      end,
      name,
      phone,
      email,
      bikes: selectedBikes,
      state: 'new'
    }

    dispatch(makeReservation(newReservation))

    setStart('')
    setEnd('')
    dispatch(clearBikeChecks())
  }

  return (
    <form onSubmit={onSubmit}>
      <BikeTable
        bikes={bikes}
        start={start}
        end={end}
        bikeIsReserved={bikeIsReserved}
      />
      <div>
        <Input
          type="date"
          name="start"
          lableText="hakupäivä"
          value={start}
          setValue={setStart}
        />
        <Input
          type="date"
          name="end"
          lableText="palautuspäivä"
          value={end}
          setValue={setEnd}
        />
        <Input
          type="text"
          name="name"
          lableText="nimi"
          value={name}
          setValue={setName}
        />
        <Input
          type="text"
          name="phone"
          lableText="puhelinnumero"
          value={phone}
          setValue={setPhone}
        />
        <Input
          type="text"
          name="email"
          lableText="sähköposti"
          value={email}
          setValue={setEmail}
        />
      </div>
      <button type="submit" disabled={!validSubmit}>
        varaa
      </button>
    </form>
  )
}

export default BikeForm
