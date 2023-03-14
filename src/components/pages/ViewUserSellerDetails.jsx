import React from 'react'
import { useLocation } from 'react-router-dom';
import UserSellerDetails from '../organisms/UserSellerDetails'

function ViewUserSellerDetails() {
    const locationData = useLocation();
    const { role } = locationData.state.person;

    return (
        <div className='container-fluid'>
            <div className="card ">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <h5 ><strong>{role} data</strong></h5>
                    </div>
                </div>

                <div className="collapse show " >
                    <div className="card-body ">
                        <UserSellerDetails />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewUserSellerDetails