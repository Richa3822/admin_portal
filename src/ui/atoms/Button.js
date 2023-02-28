import React from 'react'
import { BsFillTrashFill,BsFilter } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";


export const ButtonType = {
    DELETE: <BsFillTrashFill />,
    EDIT: <FaRegEdit />,
    FILTER: <BsFilter/>
}




export default function Button({ButtonType, name}) {
    return (
      <div>{ButtonType} {name} </div>
    )
  }