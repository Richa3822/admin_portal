import React from 'react'
import Select from 'react-select'

import InputLabel from '../atoms/InputLabel'



const InputSelector = ({ htmlFor, label, options, onChange }) => {
  return (
    <div className='form-group'>
      <InputLabel htmlFor={htmlFor} label={label} />
      <Select options={options} onChange={onChange} />
    </div>
  )
}
export default InputSelector