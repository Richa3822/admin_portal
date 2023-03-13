import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormInput from '../molecules/FormInput'
import LoginButton from '../atoms/LoginButton'
import ImgTag from '../atoms/ImgTag'
import { Formik, Form } from 'formik'
import * as yup from 'yup';

const initialValues = {
    emailId: '',
    password: ''
}

const validationSchema = yup.object({
    emailId: yup.string().email('enter valid email').required('required !'),
    password: yup.string().required('required !')
})

function Login() {
    const navigate = useNavigate()

    const [msg, setMsg] = useState("");
    function handlesubmit(values) {
        let data = values
        axios.post('http://localhost:3200/api/user/login', data)
            .then((result) => {
                console.log(result)
                if (result.data.status) {
                    setMsg(result.data.message)
                    localStorage.setItem('token',result.data.token)
                    localStorage.setItem('userData',JSON.stringify(result.data.userData))
                }
            }).catch((error) => {
                if (error.response) {
                    setMsg(error.response.data.message)
                }
            })
    }


    return (
        <div className="main-container d-flex">
            <div className="flex-1 d-flex">
                <ImgTag className="w-100" imgUrl="/assets/images/bac_removed_3.png" altText='backgroud img' />
                <img src="" alt="" />
            </div>
            <div className="d-flex flex-1 align-items-center">
                <div className="user-form d-flex align-items-center justify-content-center">
                    <Formik
                        initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubmit}>
                        <Form className="form-width">
                            <div className=" d-flex justify-content-between align-items-center">
                                <div className="signup-logo">Login</div>
                                <div className="website-logo d-flex justify-content-center align-items-center">
                                    <ImgTag className="w-100" imgUrl='/assets/images/logo1.png' altText='backgroud img' />
                                </div>
                            </div>
                            <div className="msg position-absolute w-100">
                                {
                                    msg && msg !== "login successfull!"
                                        ?<p className='text-danger'>Invalid emailId or password</p>
                                            : navigate('/')
                                }
                            </div>
                            <br />
                            
                            <FormInput outerDivClass='form-fontsize mt-2' htmlFor='email' label='Email' fieldClass='form-field' iconClass='fa-solid fa-envelope form-icon' type='email' inputClass='form-control form-para form-br' id='email' name='emailId' placeholder="   Enter email" />
                            <FormInput outerDivClass='form-fontsize mt-2' htmlFor='password' label='Password ' fieldClass='form-field' iconClass='fa-solid fa-lock form-icon' type='password' inputClass='form-control form-para form-br' id='password' name='password' placeholder="   password" />
                            <LoginButton type='submit' className='btn w-100 signup-btn' buttonText='Login' />
                    
                        </Form>
                    </Formik>
                </div>
            </div>
            <div>
            </div>
        </div>
    )
}

export default Login
