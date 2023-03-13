import React from 'react'
import { Spinner } from 'reactstrap';

const Loader = ({color}) => {
  return (
    <Spinner color={color} style={{position: 'absolute', top: '45%', left: '50%', zIndex: '1'}} />
  )
}

export default Loader