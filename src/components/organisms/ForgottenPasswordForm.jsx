import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormInput from '../molecules/FormInput'
import LoginButton from '../atoms/LoginButton'
import ImgTag from '../atoms/ImgTag'
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import { saveData } from '../../services/Api';
import Loader from '../atoms/Loader';

const initialValues = {
    emailId: '',
}

const validationSchema = yup.object({
    emailId: yup.string().email('enter valid email').required('required !'),
})

function ForgottenPasswordForm() {
    const [loader, setLoader] = useState(false);
    const [msg, setMsg] = useState("");

    function handlesubmit(values) {
        setLoader(true);
        let email = values.emailId;
        saveData(`password/forgotten-password/${email}`)
            .then((result) => {
                setLoader(false);
                setMsg(result.message)
            }).catch((error) => {
                setLoader(false);
                if (error.response) {
                    setMsg(error.response.data.message)
                }
            })
    }


    return (
        <>
            {
                // loader
                //     ?
                    // <Loader color='primary' />
                    // :
                    // null
            }
            <div className="d-flex flex-1 align-items-center">
                <div className="user-form d-flex align-items-center justify-content-center">
                    <Formik
                        initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubmit}>
                        <Form className="form-width">
                            <div className=" d-flex justify-content-between align-items-center">
                                <div className="signup-logo">Forgotten password</div>
                                <div className="website-logo d-flex justify-content-center align-items-center">
                                    <ImgTag className="w-100" imgUrl='/assets/images/logo1.png' altText='backgroud img' />
                                </div>
                                {loader  ? <Loader color='primary' />:null}
                            </div>
                            <div className="msg  w-100">
                                {
                                    msg && msg !== "login successfull!"
                                        ? <p className='text-danger'>{msg}</p>
                                        : null
                                }
                            </div>
                            <br />
                            <FormInput outerDivClass='form-fontsize mt-2' htmlFor='email' label='Email' fieldClass='form-field' iconClass='fa-solid fa-envelope form-icon' type='email' inputClass='form-control form-para form-br' id='email' name='emailId' placeholder="   Enter email" />
                            <LoginButton type='submit' className='btn w-100 signup-btn' buttonText='Send varification mail' />
                        </Form>
                    </Formik>
                </div>
            </div>
        </>
    )
}

export default ForgottenPasswordForm
