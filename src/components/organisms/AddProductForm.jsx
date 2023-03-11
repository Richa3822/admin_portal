import React, { useEffect, useState } from 'react'
import { Formik, Form, FieldArray, Field } from 'formik'
import { Button } from 'reactstrap'
import *as Yup from 'yup'
import InputBox from '../molecules/InputBox'
import InputSelector from '../molecules/InputSelector'
import CustomErrorMsg from '../atoms/CustomErrorMsg'
import ImageUpload from './UploadImgs'
import ProductDetails from './ProductDetails'
import { getData, saveData } from '../../services/Api'

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    brand: Yup.string().required('Required'),
    productDetails: Yup.object({}).required('Required'),
    category: Yup.string().required('Required'),
    image: Yup.string().required('Required'),
    variants: Yup.array().of(Yup.object({
        images: Yup.array().required('Minimum one image is required'),
        price: Yup.number().required('Required'),
        size: Yup.string().required('Required'),
        color: Yup.string().required('Required'),
        noOfProducts: Yup.number().required('Required'),
    }))
})

const options = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'kids', label: 'kids' }
]



const sizeOptions = [
    { value: 's', label: 'S' },
    { value: 'm', label: 'M' },
    { value: 'l', label: 'L' },
    { value: 'xl', label: 'XL' },
    { value: 'xs', label: 'XS' },
    { value: '2xs', label: '2XS' },
    { value: '3xs', label: '3XS' },
    { value: '4xl', label: '4xL' },
    { value: 'free size', label: 'Free Size' }
]


const AddProductForm = () => {
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedSubCategory, setSelectedSubCategory] = useState('')
    const [subCategory, setSubCategory] = useState([])
    const [bySubCategory, setBySubCategory] = useState([])

    useEffect(() => {
        getData(`category/${selectedCategory}`).then(result => {
            let data = result.subCategoryNames
            const newSubCategory = data.map((e, i) => ({
                value: e.name,
                label: e.name,
            }))
            setSubCategory(newSubCategory)

        }).catch(err => {
            console.log(err)
        })
    }, [selectedCategory])


    useEffect(() => {
        getData(`category/${selectedSubCategory}`).then(result => {
            let data = result.subCategoryNames
            const newCategory = data.map((e, i) => ({
                value: e.name,
                label: e.name,
                category: e.category
            }))
            setBySubCategory(newCategory)
        }).catch(err => {
            console.log(err)
        })

    }, [selectedSubCategory])


    const handleSubmit = async (e, data) => {
        e.preventDefault()
        console.log(data)
        await saveData('product', data).then(response => {
            console.log(response)
        }).catch(err => {
            console.log(err)
        })
    }


    return (
        <Formik
            initialValues={
                {
                    name: "",
                    brand: "",
                    productDetails: {},
                    category: "",
                    image: [],
                    variants: [{ images: [], price: "", size: "", color: '', noOfProducts: "", }],

                }}
            validationSchema={validationSchema}
        >
            {({ values, setFieldValue }) => {
                return (
                    <Form onSubmit={(e) => handleSubmit(e, values)}>
                        <div className='row'>
                            <div className='col'>
                                <InputBox htmlFor="name"
                                    label="Product Name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter Product name"
                                    inputClass="form-control"
                                />
                            </div>
                            <div className='col'>
                                <InputBox htmlFor="brand"
                                    label="Brand"
                                    type="text"
                                    name="brand"
                                    placeholder="Enter Product name"
                                    inputClass="form-control"
                                />
                            </div>
                        </div>

                        <Field name="productDetails" component={ProductDetails} />

                        <div className='row mt-4'>
                            <div className='col '>
                                <InputSelector
                                    options={options}
                                    onChange={
                                        (option) => {
                                            setSelectedCategory(option.value)
                                        }}
                                    label="Category"
                                    htmlFor="Category"
                                    value={values.category}
                                    name="category"
                                />
                                <CustomErrorMsg name="category" />
                            </div>

                            <div className='col'>
                                <InputSelector
                                    htmlFor="subCategory"
                                    label="Sub Category"
                                    options={subCategory}
                                    onChange={
                                        (option) => {
                                            setSelectedSubCategory(option.value)
                                    }}
                                />
                            </div>

                            <div className='col'>

                                <InputSelector
                                    htmlFor="subCategory"
                                    label="Sub Category"
                                    options={bySubCategory}
                                    onChange={
                                        (option) => {
                                            setFieldValue("category", option.category)
                                        }}
                                />
                            </div>

                        </div>
                        <div className='mt-5'>
                        <Field name='image' component={ImageUpload} accept=".jpg,.png" />
                        </div>
                        <FieldArray
                            name="variants"
                            render={arrayHelpers => (
                                <div className={values.variants && values.variants.length > 0 ? 'card mt-5' : ''}>
                                    {values.variants && values.variants.length > 0 ? (
                                        values.variants.map((variants, index) => (

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
                                                    <Field name={`variants.${index}.images`} maxFiles={3} accept=".jpg,.png" component={ImageUpload} multiple />
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
                                                        </div>
                                                        <div className='col'>
                                                            <InputBox htmlFor="noOfProducts"
                                                                label="No of Products"
                                                                type="number"
                                                                name={`variants.${index}.noOfProducts`}
                                                                placeholder="Enter Price"
                                                                inputClass="form-control"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className='row'>
                                                        <div className='col'>
                                                            <InputSelector
                                                                options={sizeOptions}
                                                                onChange={option => setFieldValue(`variants.${index}.size`, option.value)}
                                                                label="Size"
                                                                htmlFor="Size"
                                                                name={`variants.${index}.size`}
                                                            />
                                                            <CustomErrorMsg name="size" />
                                                        </div>
                                                        <div className='col'>
                                                            <InputBox htmlFor="color"
                                                                label="Color"
                                                                type="text"
                                                                name={`variants.${index}.color`}
                                                                placeholder="Enter color"
                                                                inputClass="form-control"
                                                            />
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
                                            onClick={() => arrayHelpers.push({ images: [], price: "", noOfProducts: "", size: "", color: "" })} // insert an empty string at a position
                                        >
                                            Add variants +
                                        </Button>
                                    </div>
                                </div>
                            )}
                        />
                        <div className='mt-4 mb-3 float-right'>
                            <Button color='primary' type="submit">Submit</Button>
                        </div>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default AddProductForm 