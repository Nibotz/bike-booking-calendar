import { useState } from 'preact/hooks'
import { BikeFormData } from '../../types'
import './InputStyle.css'

type PropTypes = {
  type: string,
  lableText: string,
  name?: string,
  dataKey: keyof BikeFormData,
  data: BikeFormData,
  vData: BikeFormData,
  setData: (data: BikeFormData) => void
}

export const Input = ({ type, lableText, name, dataKey, data, vData, setData }: PropTypes) => {
  const [showInvalid, SetShowInvalid] = useState(false)

  const value = data[dataKey]
  const vValue = showInvalid && vData[dataKey]

  if (value && !vValue && !showInvalid) {
    SetShowInvalid(true)
  }

  return (
    <div class='bike-input-element'>
      <div class={'bike-input-label'}>
        <label htmlFor={'bike-input-' + dataKey}>{lableText}</label>
        {vValue && <span class='bike-input-error'>{vValue}</span>}
      </div>
      <div class={'bike-input' + (vValue ? ' bike-input-invalid' : '')}>
        <input
          id={'bike-input-' + dataKey}
          name={name}
          type={type}
          value={value}
          onChange={({ currentTarget }) => setData({ ...data, [dataKey]: currentTarget.value})}
        />
      </div>
    </div>
  )
}
