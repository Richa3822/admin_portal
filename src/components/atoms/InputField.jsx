import { Field } from 'formik'
import React from 'react'
const InputField = (props) => {
    const { name, type, placeholder,value, id, inputClass, disabled} = props
    return (
        <>
            < Field
                name={name}
                type={type}
                placeholder={placeholder}
                id={id}
                className={inputClass}
                disabled={disabled}
                value = {value}
            />
        </>
    )

}
export default InputField
