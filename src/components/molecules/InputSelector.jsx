import { Field } from 'formik'
import React from 'react'
import Select from 'react-select'

import InputLabel from '../atoms/InputLabel'



const InputSelector = ({ htmlFor, label, name = "", options, onChange, defaultValue = { label: "Select", value: 0 }, disabled = false }) => {
  return (
    <div className='form-group'>
      <InputLabel htmlFor={htmlFor} label={label} />
      {/* <Field name="role" > */}
        {/* {({ field }) => ( */}

          <Select options={options} onChange={onChange} defaultValue={defaultValue} isDisabled={disabled} />
        {/* ) */}

        {/* } */}
      {/* </Field> */}

    </div>
  )
}
export default InputSelector