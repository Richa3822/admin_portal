import { Field } from 'formik'
import React from 'react'
const InputField = (props) => {
    const { name, type, placeholder, id, inputClass} = props
    return (
        <>
            < Field
                name={name}
                type={type}
                placeholder={placeholder}
                id={id}
                className={inputClass}
            />
        </>
    )

}
export default InputField
