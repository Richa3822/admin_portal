import React from 'react'
import Select from 'react-select'



const InputSelector = ({options,value,id,text, onChange}) => {
  return (
    <div className='form-group'>
      <label htmlFor="sell">Choose Category</label>
      <Select options={options} id={id} text={text} onChange={onChange} value={value} />
    </div>
  )
}
export default  InputSelector