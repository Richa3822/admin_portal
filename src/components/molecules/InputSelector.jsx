import { Field } from 'formik'
import React from 'react'
import Select from 'react-select'

import InputLabel from '../atoms/InputLabel'



const InputSelector = ({ htmlFor, label, name = "", options, onChange, defaultValue = { label: "Select", value: 0 } }) => {
  return (
    <div className='form-group'>
      <InputLabel htmlFor={htmlFor} label={label} />
      {/* <Field name="role" > */}
        {/* {({ field }) => ( */}

          <Select options={options} onChange={onChange} defaultValue={defaultValue} />
        {/* ) */}

        {/* } */}
      {/* </Field> */}

    </div>
  )
}
export default InputSelector