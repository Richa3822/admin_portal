import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FormInput from '../molecules/FormInput'
import LoginButton from '../atoms/LoginButton'
import ImgTag from '../atoms/ImgTag'
import { Formik, Form } from 'formik'
import * as Yup from 'yup';
import { saveData } from '../../services/Api';
import Loader from '../atoms/Loader';

const initialValues = {
    password: '',
    confirm_password: ''
}
const validationSchema = Yup.object({
    password: Yup.string().required(),
    confirm_password: Yup.string().label('confirm password').required().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

function Login() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false);
    const [msg, setMsg] = useState("");

    function handlesubmit(values) {
        setLoader(true);
        const data = values;
        console.log(values);
        const response = JSON.parse(localStorage.getItem('setpwd'));
        if (response.token) {
            saveData(`password/${response.token}`, data).then((result) => {
                setLoader(false);
                if (result.status) {
                    setMsg(result.message);
                    localStorage.removeItem('setpwd');
                    navigate('/login');
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
    }

    return (
        <div className="d-flex flex-1 align-items-center">
            <div className="user-form d-flex align-items-center justify-content-center">
                <Formik
                    initialValues={initialValues} validationSchema={validationSchema} onSubmit={handlesubmit}>
                    <Form className="form-width">
                        <div className=" d-flex justify-content-between align-items-center">
                            <div className="signup-logo">Set password</div>
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
                        {loader ? <Loader color='primary' /> : null}
                        <FormInput outerDivClass='form-fontsize mt-2' htmlFor='password' label='new Password ' fieldClass='form-field' iconClass='fa-solid fa-lock form-icon' type='password' inputClass='form-control form-para form-br' id='newPassword' name='password' placeholder="   Enter new password" />
                        <FormInput outerDivClass='form-fontsize mt-2' htmlFor='confirmPassword' label='confirm Password ' fieldClass='form-field' iconClass='fa-solid fa-lock form-icon' type='password' inputClass='form-control form-para form-br' id='newPassword' name='confirm_password' placeholder="   Enter password again" />
                        <LoginButton type='submit' className='btn w-100 signup-btn' buttonText='change password' />
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Login
