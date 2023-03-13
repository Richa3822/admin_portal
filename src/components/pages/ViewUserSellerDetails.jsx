import React from 'react'
import { useLocation } from 'react-router-dom';
import UserSellerDetails from '../organisms/UserSellerDetails'

function ViewUserSellerDetails() {
    const locationData = useLocation();
    const { role } = locationData.state.person;

    return (
        <div className='mx-5' >
            <div className='mt-5'>
                <h5 className='pb-4 border-bottom' ><strong>{role} data </strong></h5>
            </div>

            <div className='mt-4' >
                <UserSellerDetails />
            </div>

        </div>
    )
}

export default ViewUserSellerDetails