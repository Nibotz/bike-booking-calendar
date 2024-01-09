import { useDispatch, useSelector } from 'react-redux'
import { Action, ThunkDispatch } from '@reduxjs/toolkit'
import { useState } from 'preact/hooks'
import { makeReservation } from '../../reducers/bikeAppState'
import { Bike, BikeFormData, BikeState, NewReservation, Reservation, StoreType } from '../../types'
import { Input } from '../utils/Input'
import { Table } from '../utils/Table'
import BikeEntry from './BikeEntry'
import { getCurrentDay, getActiveReservations } from './utils'
import './index.css'

interface BikeData {
  bike: Bike,
  checked: boolean
}

const clearedFormData: BikeFormData = {
  name: '', phone: '', email: '', start: '', end: ''
}

const BikeForm = () => {
  const dispatch = useDispatch<ThunkDispatch<undefined,void,Action>>()
  const [resetKey, setResetKey] = useState(false);
  const [message, setMessage] = useState('')
  const [data, setData] = useState(clearedFormData)
  const [bikeList, setBikeList] = useState<BikeData[]>()
  const [activeReservations, setActiveReservations] = useState<Reservation[]>()

  const { bikes, reservations } = useSelector<StoreType,BikeState>(state => state.bikeApp)

  if (bikeList === undefined && bikes.length > 0) {
    setBikeList(bikes.map(bike => ({ bike: bike, checked: false })))
  }
  if (activeReservations === undefined && reservations.length > 0) {
    setActiveReservations(getActiveReservations(reservations))
  }

  // DATA VALIDATION

  const currentDay = getCurrentDay()

  const vData = { ...clearedFormData }
  Object.entries(data).forEach(([key, val]) => {
    if (!val) vData[key as keyof BikeFormData] = 'missing'
  })

  if (!vData.start && data.start < currentDay) {
    vData.start = 'invalid'
  }
  if (!vData.end && (data.end < currentDay || data.end < data.start)) {
    vData.end = 'invalid'
  }

  const validSubmit = !Object.values(vData).some(v => v) && bikeList?.some(b => b.checked)

  // FUNCTIONS

  const isReserved = (id: number): boolean => {
    const start = data.start || data.end
    const end = data.end || data.start
    if (activeReservations === undefined || (!start && !end)) {
      return false
    }
    for (const res of activeReservations) {
      if (res.bikes.includes(id) && start <= res.end && end >= res.start) {
        return true
      }
    }
    return false
  }

  const toggleBikeCheck = (id: number) => {
    setBikeList(bikeList?.map(b => b.bike.id === id ? { ...b, checked: !b.checked } : b))
  }

  const onSubmit = (e: any) => {
    e.preventDefault()
    if (!validSubmit) return

    const newReservation = {
      date: (new Date()).toJSON(),
      ...data,
      bikes: bikeList!.filter(b => b.checked && !isReserved(b.bike.id)).map(b => b.bike.id),
      status: 'new'
    } as NewReservation

    dispatch(makeReservation(newReservation))

    setData(clearedFormData);
    setResetKey(!resetKey);
    setBikeList(bikes.map(bike => ({ bike: bike, checked: false })))

    setMessage('varaus onnistui!')
  }

  return (
    <div class='bike-reservation-form'>
      {message && 
        <div class='bike-message'>
          <span>{message}</span>
          <button onClick={() => setMessage('')}>hide</button>
        </div>
      }
      <form onSubmit={onSubmit} key={resetKey}>
        <div class='bike-input-group'>
          <Input type="text" name="name" lableText="nimi" dataKey='name' data={data} vData={vData} setData={setData} />
          <Input type="text" name="phone" lableText="puhelin" dataKey='phone' data={data} vData={vData} setData={setData} />
          <Input type="text" name="email" lableText="email" dataKey='email' data={data} vData={vData} setData={setData} />
        </div>
        <div class='bike-input-group'>
          <Input type="date" lableText="hakupäivä" dataKey='start' data={data} vData={vData} setData={setData} />
          <Input type="date" lableText="palautuspäivä" dataKey='end' data={data} vData={vData} setData={setData} />
        </div>
        <div class='bike-input-table'>
          <Table columns={['pyörä', 'koko', 'väri', 'malli', 'tila', 'valitse']}>
            {bikeList?.map(b => (
              <BikeEntry
                key={b.bike.id}
                bike={b.bike}
                isReserved={isReserved(b.bike.id)}
                isValid={!vData.start && !vData.end}
                isChecked={b.checked}
                toggleCheck={() => toggleBikeCheck(b.bike.id)}
              />
            ))}
          </Table>
        </div>
        <button class='button' type="submit" disabled={!validSubmit}>
          varaa
        </button>
      </form>
    </div>
  )
}

export default BikeForm
