import {ErrorMessage} from 'formik'

import React from 'react'

function ErrorMsg(props) {
const {className , name} = props;
  return (
    <ErrorMessage name={name}>
        {
            (errorMsg)=>{
                return (<div className={className?className:'text-danger mt-1'}>{name} {errorMsg}</div>)
            }
        }
    </ErrorMessage>
  )
}

export default ErrorMsg
