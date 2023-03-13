import React from 'react'

function Label(props) {
    const {htmlFor , label} = props;
  return (
      <label  htmlFor={htmlFor}>{label}</label>
  )
}

export default Label
