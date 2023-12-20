import { useDispatch, useSelector } from 'react-redux'
import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { toggleBikeCheck, clearBikeChecks } from '../reducers/bikeReducer'
import { makeReservation } from '../reducers/reservationReducer'
import { Bike, Reservation, Status, StoreType } from '../types'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'

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
          <BikeEntry
            key={b.id}
            bike={b}
            checkLock={!start || !end}
            isReserved={isReserved(b)}
          />
        ))}
      </tbody>
    </table>
  )
}

const Input = (
  { type, lableText, name, value, setValue }:
  { type: string, lableText: string, name: string, value: string, setValue: (val: string) => void }) => 
{
  return (
    <>
      <label htmlFor={'bikeForm-' + name}>{lableText}: </label>
      <input
        id={'bikeForm-' + name}
        name={name}
        type={type}
        value={value}
        onChange={({ currentTarget }) => setValue(currentTarget.value)}
      />
      <br />
    </>
  )
}

const BikeForm = () => {
  const dispatch: ThunkDispatch<undefined, void, Action> = useDispatch()
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const bikes = useSelector<StoreType, Bike[]>(state => state.bikes)

  const reservations = useSelector<StoreType, Reservation[]>(state => state.reservations)
  const bikeIsReserved = (bike: Bike) => {
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

  const onSubmit = (event: JSX.TargetedSubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!validSubmit) {
      return
    }

    const selectedBikes = bikes.map(
      bike => bike.checked && !bikeIsReserved(bike)
    )
    const newReservation = {
      date: (new Date()).toISOString(),
      start,
      end,
      name,
      phone,
      email,
      bikes: selectedBikes,
      status: Status.new
    }

    dispatch(makeReservation(newReservation))

    setStart('')
    setEnd('')
    dispatch(clearBikeChecks())
  }

  return (
    <form onSubmit={onSubmit}>
      <BikeTable bikes={bikes} start={start} end={end} isReserved={bikeIsReserved} />
      <div>
        <Input type="date" name="start" lableText="hakupäivä" value={start} setValue={setStart} />
        <Input type="date" name="end" lableText="palautuspäivä" value={end} setValue={setEnd} />
        <Input type="text" name="name" lableText="nimi" value={name} setValue={setName} />
        <Input type="text" name="phone" lableText="puhelin" value={phone} setValue={setPhone} />
        <Input type="text" name="email" lableText="email" value={email} setValue={setEmail} />
      </div>
      <button type="submit" disabled={!validSubmit}>
        varaa
      </button>
    </form>
  )
}

export default BikeForm
