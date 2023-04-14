import { Formik, Form, Field } from 'formik'
import React from 'react'
import { saveData } from '../../services/Api'
import UploadImgs from '../organisms/UploadImgs'

const AddOffers = () => {

    const handleSubmit = async (e, data) => {
        e.preventDefault()
        await saveData('offers', data).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <Formik
            initialValues={{
                images: [],
            }}
            onSubmit={values => { console.log(values) }}
        >
            {({ values }) => {
                return (
                    <Form onSubmit={(e) => handleSubmit(e, values)}>
                        <div className='container-fluid'>
                            <div className="card ">
                                <div className="card-header d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 ><strong>Add Offers</strong></h5>
                                    </div>
                                </div>

                                <div className="collapse show " >
                                    <div className="card-body ">
                                        <Field name="images" maxFiles={3} component={UploadImgs} accept=".jpg,.png" multiple />
                                    </div>
                                </div>
                                <div className='container-fluid mb-4'>
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}}
        </Formik>
    )
}
export default AddOffers
