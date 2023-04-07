import { Formik, Form, Field } from 'formik'
import React, { useState } from 'react'
import { saveData } from '../../services/Api'
import InputBox from '../molecules/InputBox'
import OfferTimer from '../molecules/OfferTimer'
import UploadImgs from '../organisms/UploadImgs'

const AddOffers = () => {

    // const [startDate, setStartdate] = useState()
    // const [endDate, setEndDate] = useState()

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
                // startdate: '',
                enddate: ''
            }}
            onSubmit={values => { console.log(values) }}
        >
            {({ values }) => {
                console.log(values)
                return (
                    <>
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

                                <div className='d-flex '>
                                   

                                    <InputBox label="enddate"
                                        forHtml="enddate"
                                        type="date"
                                        name="enddate"
                                        inputClass="form-control"
                                    />
                                </div>
                                <div className='container-fluid mb-4'>
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                                </div>
                            </div>
                        </div>
                    </Form>
                 {values.startdate && values.enddate ?   <OfferTimer  endDate={values.enddate}/> : null}
                    </>                    
                )
            }}
        </Formik>
    )
}
export default AddOffers
