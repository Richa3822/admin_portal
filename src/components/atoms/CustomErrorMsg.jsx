import React from 'react'
import { ErrorMessage } from 'formik'
const CustomErrorMsg = ({ name }) => {
  return (
    <div className='error-msg'>
      <ErrorMessage name={name} />
    </div>
  )
}
export default CustomErrorMsg