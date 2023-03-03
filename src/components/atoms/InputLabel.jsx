import React from 'react'

 const InputLabel = ( {forHtml,label}) => {
  return (
 
    <>
    <label htmlFor={forHtml} >{label}</label>
    </>
  )
}
export default InputLabel