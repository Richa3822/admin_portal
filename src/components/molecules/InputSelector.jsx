import React from 'react'
import Select from 'react-select'

import InputLabel from '../atoms/InputLabel'



const InputSelector = ({htmlFor, label, options, onChange, defaultValue = { label: "Select", value: 0 }}) => {
  return (
    <div className='form-group'>
    <InputLabel htmlFor={htmlFor} label={label}   />
      <Select options={options}  onChange={onChange} defaultValue={defaultValue}    />   
      </div> 
  )
}
export default InputSelector