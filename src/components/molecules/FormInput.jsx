import LoginInputField from '../atoms/LoginInputField'
import Label from '../atoms/Label'
import React from 'react'
import ErrorMsg from '../atoms/ErrorMsg';

function FormInput(props) {
    const  {type, inputClass, id, name, placeholder, htmlFor , label, outerDivClass,fieldClass,iconClass,errorClass } = props;
  return (
    <div className={outerDivClass}>
      <Label htmlFor={htmlFor}  label={label}/>
      <div className={fieldClass}>
      <i className={iconClass}></i>
      <LoginInputField type={type} className={inputClass}
                id={id} name={name} placeholder={placeholder}/>
                </div>
                <ErrorMsg name={name} className={errorClass} />
    </div>
  )
}

export default FormInput
