import { ResStatus } from "../../types"

export const dateFormat = (d: string) => d.split('-').reverse().join('.')

export const statusToText = (text: ResStatus): string => {
  switch (text) {
    case 'new':
      return 'uusi'
    case 'confirmed':
      return 'hyväksytty'
    case 'rejected':
      return 'hylätty'
    case 'retrieved':
      return 'haettu'
    case 'returned':
      return 'palautettu'
    default:
      return 'error'
  }
}

export const statusToColor = (text: ResStatus): string => {
  switch (text) {
    case 'new':
      return '#add8e6'
    case 'confirmed':
      return '#00bb00'
    case 'rejected':
      return '#ff0000'
    case 'retrieved':
      return '#00ff00'
    case 'returned':
      return '#999999'
    default:
      return '#000000'
  }
}