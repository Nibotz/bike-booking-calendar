import { ResStatus } from "../../types"

export const dateFormat = (d: string) => d.split('-').reverse().join('.')

export const BikeList = (bikes: boolean[]) => 
  bikes.map((b, i) => (b ? i + 1 : 0)).filter(b => b).join(', ')

export const statusToText = (text: ResStatus): string => {
  switch (text) {
    case ResStatus.new:
      return 'uusi'
    case ResStatus.confirmed:
      return 'hyväksytty'
    case ResStatus.rejected:
      return 'hylätty'
    case ResStatus.retrieved:
      return 'haettu'
    case ResStatus.returned:
      return 'palautettu'
    default:
      return 'error'
  }
}

export const statusToColor = (text: ResStatus): string => {
  switch (text) {
    case ResStatus.new:
      return '#add8e6'
    case ResStatus.confirmed:
      return '#00bb00'
    case ResStatus.rejected:
      return '#ff0000'
    case ResStatus.retrieved:
      return '#0000aa'
    case ResStatus.returned:
      return '#999999'
    default:
      return '#000000'
  }
}