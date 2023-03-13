import React from 'react'

function LoginButton(props) {
    const {buttonText,...rest }= props;
  return (
   <button {...rest}>{buttonText}</button>
  )
}

export default LoginButton