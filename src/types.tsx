export interface Bike {
  id: number
  size: string
  color: string
  model: string
  checked: boolean
}

export type BikeData = Omit<Bike, 'checked'>

export enum Status {
  new = 'new',
  confirmed = 'confirmed',
  rejected = 'rejected'
}

export interface Reservation {
  id: number
  date: string
  start: string
  end: string
  bikes: boolean[]
  name: string
  phone: string
  email: string
  status: Status
}

export type NewReservation = Omit<Reservation, 'id'>

export interface StoreType {
  bikes: Bike[]
  reservations: Reservation[]
}
