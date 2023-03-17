import React, { useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormInput from '../molecules/FormInput'
import LoginButton from '../atoms/LoginButton'
import ImgTag from '../atoms/ImgTag'
import { Formik, Form } from 'formik'
import * as yup from 'yup';
import { Link} from 'react-router-dom';
import { updateData} from '../../services/Api';
import Loader from '../atoms/Loader';

const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
}

const validationSchema = yup.object({
    oldPassword: yup.string().required('required !'),
    newPassword: yup.string().notOneOf([yup.ref('oldPassword')], 'New password cannot be the same as old password').required('required !'),
    confirmPassword: yup.string().required('required !').oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})

function Login() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [msg, setMsg] = useState("");

    function handlesubmit(values) {
        setLoader(true);
        const user = JSON.parse(localStorage.getItem('userData'));
        const id = user._id;
        let data = values;
        console.log(data);
        updateData(`password/${id}`,data)
        .then((result) => {
                setLoader(false);
                if (result.status) {
                    setMsg(result.message)
                        navigate('/');
                }
                else {
                    setMsg(result.message)
                }
            }).catch((error) => {
                setLoader(false);
                if (error.response) {
                    setMsg(error.response.data.message)
                }
            })
    }


    return (

        <div className="d-flex flex-1 align-items-center">
            <div className="user-form d-flex align-items-center justify-content-center">
                <Formik
                    initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubmit}>
                    <Form className="form-width">
                        <div className=" d-flex justify-content-between align-items-center">
                            <div className="signup-logo">reset password</div>
                            <div className="website-logo d-flex justify-content-center align-items-center">
                                <ImgTag className="w-100" imgUrl='/assets/images/logo1.png' altText='backgroud img' />
                            </div>
                        </div>
                        <div className="msg position-absolute w-100">
                            {
                                msg && msg !== "login successfull!"
                                    ? <p className='text-danger'>{msg}</p>
                                    : navigate('/')
                            }
                        </div>
                        <br />
                        {loader  ? <Loader color='primary' />:null}
                        <FormInput outerDivClass='form-fontsize mt-2' htmlFor='oldPassword' label='old Password' fieldClass='form-field' iconClass='fa-solid fa-envelope form-icon' type='password' inputClass='form-control form-para form-br' id='oldPassword' name='oldPassword' placeholder="   Enter old password" />
                        <div className="col">
                            <Link to='/forgotten-password'>Forgot password?</Link>
                        </div>
                        <FormInput outerDivClass='form-fontsize mt-2' htmlFor='newPassword' label='new Password ' fieldClass='form-field' iconClass='fa-solid fa-lock form-icon' type='password' inputClass='form-control form-para form-br' id='newPassword' name='newPassword' placeholder="   Enter new password" />
                        <FormInput outerDivClass='form-fontsize mt-2' htmlFor='confirmPassword' label='confirm Password ' fieldClass='form-field' iconClass='fa-solid fa-lock form-icon' type='password' inputClass='form-control form-para form-br' id='newPassword' name='confirmPassword' placeholder="   Enter password again" />
                        <LoginButton type='submit' className='btn w-100 signup-btn' buttonText='change password' />
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login
