import React from 'react'
import UserSellerDetails from '../organisms/UserSellerDetails'

function AddUserSeller() {
    return (
        <div className='container-fluid'>
            <div className="card ">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <h5 ><strong>Add User or Seller</strong></h5>
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

export default AddUserSeller