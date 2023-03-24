import React from 'react'
import ForgottenPasswordForm from '../organisms/ForgottenPasswordForm'
import ImgTag from '../atoms/ImgTag'

function ForgottenPassword() {
    return (
        <div className="main-container d-flex">
            <div className="flex-1 d-flex">
                <ImgTag className="w-100" imgUrl="/assets/images/bac_removed_3.png" altText='backgroud img' />
                <img src="" alt="" />
            </div>
            <ForgottenPasswordForm />
        </div>
    )
}

export default ForgottenPassword
