import React from 'react';
import { Formik, Form } from 'formik';
import *as Yup from 'yup'
import InputBox from '../molecules/InputBox';
import { useNavigate } from 'react-router-dom';
import { saveData } from '../../services/Api';

const validationSchema = Yup.object({
    password: Yup.string().required(),
    confirm_password: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})
const ResetPassword = () => {
    const navigate = useNavigate();
    return (
        <Formik
            initialValues={{
                password: '',
                confirm_password: ''
            }}
            onSubmit={(values, actions) => {
                const data = values;
                const token = localStorage.getItem('sellerToken');
                if (token) {
                    saveData(`password/${token}`, data).then((res) => {
                        if (res.msg) {
                            navigate('/login');
                            return;
                        } else {
                            return (<div>{res.err}</div>)
                        }
                    });
                } else {
                    return (<div><h3>token is expired...</h3></div>)
                }
            }}
            validationSchema={validationSchema}
        >
            {({ values }) => {
                return (
                    <div className='reset-form' style={{ height: "800px" }}>
                        <div className='reset-form-container shadow'>
                            <h2 className='reset-form-header'>Please Reset Your Password</h2>
                            <Form className='p-4'>
                                <InputBox htmlFor="password"
                                    label="Password"
                                    type="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    inputClass="form-control"
                                />
                                <InputBox htmlFor="confirm_password"
                                    label="confirm password"
                                    type="password"
                                    name="confirm_password"
                                    placeholder="Enter your password"
                                    inputClass="form-control"
                                />
                                <button className='reset-pwd-button'>Submit</button>
                            </Form>
                        </div>
                    </div>
                )
            }}
        </Formik>
    )
}
export default ResetPassword