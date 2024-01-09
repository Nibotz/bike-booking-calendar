export interface Bike {
  id: number
  size: string
  color: string
  model: string
}

export type ResStatus = 'new' | 'confirmed' | 'rejected' | 'retrieved' | 'returned'

export interface Reservation {
  id: number
  date: string
  start: string
  end: string
  bikes: number[]
  name: string
  phone: string
  email: string
  status: ResStatus
}

export type NewReservation = Omit<Reservation, 'id'>

export interface BikeState {
  bikes: Bike[],
  reservations: Reservation[],
}

export interface StoreType {
  bikeApp: BikeState
}

export interface BikeFormData {
  name: string
  phone: string
  email: string
  start: string
  end: string
}
