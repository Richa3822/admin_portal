import React from 'react'

const InputRadio = ({ id, name, value, defaultChecked, label, onChange, onBlur }) => {
  return (
    <div className="form-check-inline">
      <label className="form-check-label" htmlFor={id}>
        <input type='radio'
         className="form-check-input"
         id={id} name={name}
         value={value}
         defaultChecked={defaultChecked}
         onChange={onChange}
          onBlur={onBlur} 
          />
        {label}
      </label>
    </div>
  )
}
export default InputRadio