import React from 'react'
import { Formik, Form, FieldArray, Field } from 'formik'
import { Button } from 'reactstrap'
import *as Yup from 'yup'
import InputBox from '../molecules/InputBox'
import InputSelector from '../molecules/InputSelector'
import CustomErrorMsg from '../atoms/CustomErrorMsg'


const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    brand: Yup.string().required('Required'),
    productDetails: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    images: Yup.string().required('Required'),
    variants: Yup.array().of(Yup.object({
        images: Yup.string().required('Required'),
        price: Yup.number().required('Required'),
        size: Yup.string().required('Required'),
        color: Yup.string().required('Required'),
        noOfProducts: Yup.number().required('Required'),

    }))
})

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberr' },
    { value: 'vanilla', label: 'Vanilla' }
]

const AddProductForm = () => {
    return (
        <Formik
            initialValues={
                {
                    name: "",
                    brand: "",
                    productDetails: "",
                    category: "",
                    images: "",
                    variants: [{ images: "", price: "", size: "", color: '', noOfProducts: "", }],

                }}
            onSubmit={(values) => {
                console.log(values + "Helooo")
            }}
            validationSchema={validationSchema}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form >
                        <div className='row'>
                            <div className='col'>
                                <InputBox htmlFor="name"
                                    label="Product Name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Product name"
                                    inputClass="form-control"
                                />
                                <CustomErrorMsg name='name' />
                            </div>


                            <div className='col'>
                                <InputBox htmlFor="brand"
                                    label="Brand"
                                    type="text"
                                    name="brand"
                                    placeholder="Enter Product name"
                                    inputClass="form-control"
                                />
                                <CustomErrorMsg name='brand' />

                            </div>
                        </div>


                        <div className='row'>
                            <div className='col'>
                                <InputBox htmlFor="productDetails"
                                    label="Product Details"
                                    type="text"
                                    name="productDetails"
                                    placeholder="Enter product Details"
                                    inputClass="form-control"
                                />
                                <CustomErrorMsg name='productDetails' />

                            </div>
                            <div className='col'>
                                <InputSelector
                                    options={options}
                                    onChange={option => setFieldValue("category", option.value)}
                                    label="Category"
                                    htmlFor="Category"
                                    value={values.category}
                                />
                                <CustomErrorMsg name='category' />
                            </div>

                        </div>

                        <InputBox htmlFor="images"
                            type="file"
                            name="images"
                        />
                        <CustomErrorMsg name='images' />


                        <FieldArray
                            name="variants"
                            render={arrayHelpers => (
                                <div className={values.variants && values.variants.length > 0 ? 'card mt-5' : ''}>
                                    {values.variants && values.variants.length > 0 ? (
                                        values.variants.map((friend, index) => (

                                            <div key={`${index}-varients`} >

                                                <div className='card-header d-flex justify-content-between align-items-center '>
                                                    <div>
                                                        <h5 ><strong>{`Option ${index + 1}`}</strong></h5>
                                                    </div>
                                                    <div>
                                                        <Button
                                                            type="button"
                                                            color='primary'
                                                            onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                                                        >
                                                            X
                                                        </Button>
                                                    </div>
                                                </div>

                                                <div className='container-fluid mt-3'>
                                                    <InputBox htmlFor="images"
                                                        type="file"
                                                        name={`variants.${index}.images`}
                                                    />
                                                    <CustomErrorMsg name={`variants.${index}.images`} />

                                                    <div className='row'>
                                                        <div className='col'>
                                                            <InputBox htmlFor="price"
                                                                label="Price"
                                                                type="number"
                                                                name={`variants.${index}.price`}
                                                                placeholder="Enter Price"
                                                                inputClass="form-control"
                                                            />
                                                            <CustomErrorMsg name={`variants.${index}.price`} />
                                                        </div>
                                                        <div className='col'>
                                                            <InputBox htmlFor="noOfProducts"
                                                                label="No of Products"
                                                                type="number"
                                                                name={`variants.${index}.noOfProducts`}
                                                                placeholder="Enter Price"
                                                                inputClass="form-control"
                                                            />
                                                            <CustomErrorMsg name={`variants.${index}.noOfProducts`} />
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col'>
                                                            <InputBox htmlFor="size"
                                                                label="Size"
                                                                type="number"
                                                                name={`variants.${index}.size`}
                                                                placeholder="Enter size"
                                                                inputClass="form-control"
                                                            />
                                                            <CustomErrorMsg name={`variants.${index}.size`} />
                                                        </div>
                                                        <div className='col'>
                                                            <InputBox htmlFor="color"
                                                                label="Color"
                                                                type="text"
                                                                name={`variants.${index}.color`}
                                                                placeholder="Enter color"
                                                                inputClass="form-control"
                                                            />
                                                            <CustomErrorMsg name={`variants.${index}.color`} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : null}
                                    <div className='container-fluid d-flex justify-content-between align-items-center mt-3 pb-4 '>
                                        <Button
                                            type="button"
                                            color='primary'
                                            onClick={() => arrayHelpers.push({ images: "", price: "", noOfProducts: "", size: "", color: "" })} // insert an empty string at a position
                                        >
                                            Add variants +
                                        </Button>
                                        <div>
                                            <Button color='primary' type="submit">Submit</Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        />
                    </Form>
                )
            }}
        </Formik>


    )
}

export default AddProductForm 