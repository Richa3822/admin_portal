import React from 'react'
import Button,  { ButtonType } from '../atoms/Button'

import OrderNavbar from '../molecules/OrderNavbar'
const ViewOrders = () => {
    return (
        <div className='mt-4'>
            <h5 className='ml-5'><strong> Order details</strong></h5>
            <OrderNavbar />
            <hr />
            <div className='d-flex justify-content-around align-items-center'>
               <div>
               </div>
               <div>
                <Button ButtonType={ButtonType.FILTER}  />
               </div>
            </div>
        </div>
    )
}

export default ViewOrders