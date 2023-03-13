import React from 'react'
import { Spinner } from 'reactstrap';

const Loader = ({color}) => {
  return (
    <Spinner color={color} />
  )
}

export default Loader