import { useDispatch, useSelector } from 'react-redux'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { JSX } from 'preact'
import { useState } from 'preact/hooks'
import { clearBikeChecks } from '../../reducers/bikeReducer'
import { makeReservation } from '../../reducers/reservationReducer'
import { Bike, Reservation, ResStatus, StoreType } from '../../types'
import { Input } from '../utils/Input'
import BikeTable from './BikeTable'

const BikeForm = () => {
  const dispatch = useDispatch<ThunkDispatch<undefined,void,Action>>()
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')

  const bikes = useSelector<StoreType,Bike[]>(state => state.bikes)

  const reservations = useSelector<StoreType,Reservation[]>(state => state.reservations)
  const bikeIsReserved = (bike: Bike) => {
    const start0 = start || end
    const end0 = end || start
    for (const res of reservations) {
      if (res.bikes[bike.id] && start0 <= res.end && end0 >= res.start) {
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
      start, end,
      name, phone, email,
      bikes: selectedBikes,
      status: ResStatus.new
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
