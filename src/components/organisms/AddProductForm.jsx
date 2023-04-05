import React, { useEffect, useState } from 'react'
import { Formik, Form, FieldArray, Field } from 'formik'
import { Button } from 'reactstrap'
import *as Yup from 'yup'
import InputBox from '../molecules/InputBox'
import InputSelector from '../molecules/InputSelector'
import CustomErrorMsg from '../atoms/CustomErrorMsg'
import ImageUpload from './UploadImgs'
import ProductDetails from './ProductDetails'
import { getData, saveData, axiosPatch } from '../../services/Api'
import Loader from '../atoms/Loader'
import { useNavigate, useParams } from 'react-router-dom'
import { isMongoId } from '../../services/services'

const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    brand: Yup.string().required('Brand name is Required'),
    productDetails: Yup.object({}).required('Product Details is Required'),
    category: Yup.string().required('Category is Required'),
    image: Yup.string().required('Image is Required'),
    variants: Yup.array().of(Yup.object({
        images: Yup.array().required('Minimum one image is required'),
        price: Yup.number().required('Price is Required'),
        size: Yup.string().required('Size is Required'),
        color: Yup.string().required('Color is Required'),
        noOfProducts: Yup.number().required('No of Products Required'),
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
    const { id: productId } = useParams();
    const navigate = useNavigate();
    console.log("productId = ", productId)

    const [selectedCategory, setSelectedCategory] = useState('Select')
    const [selectedSubCategory, setSelectedSubCategory] = useState('Select')
    const [selectedBySubCategory, setSelectedBySubCategory] = useState('Select')
    const [selectedSeller, setSelectedSeller] = useState('Select')
    const [subCategory, setSubCategory] = useState([])
    const [bySubCategory, setBySubCategory] = useState([])
    const [loader, setLoader] = useState(false)
    const [sellers, setSellers] = useState([]);
    const [pageLoad, setPageLoad] = useState({ isDataFetched: false, isSellerSet: false });

    const user = localStorage.getItem('userData') ? JSON.parse(localStorage.getItem('userData')) : {};
    
    const isEditProductMode = isMongoId(productId);


    // http://localhost:4000/api/product/640f201af24ae119f50a86fe
    // console.log(" pid = ", productId, " = ", checkForHexRegExp.test(productId))

    const [initialValues, setInitialValues] = useState({
        sellerId: user?.role === 'seller' ? user?._id : "",
        name: "",
        brand: "",
        productDetails: {},
        category: "",
        image: "",
        variants: [{ images: [], price: "", size: "Select", color: '', noOfProducts: "", }],
    })




    useEffect(() => {
        // console.log(" pid = ", productId, " = ", checkForHexRegExp.test(productId))
        if (isEditProductMode) {
            setPageLoad(prevValue => {
                return { isDataFetched: true, isSellerSet: true }
            });

            getData(`product/${productId}`)
                .then(data => {
                    // console.log("data = ", data)
                    const { category } = data?.product;
                    const categoryArr = category.split('/');
                    console.log(categoryArr)
                    setInitialValues(data?.product)
                    setSelectedCategory(categoryArr[1])
                    setSelectedSubCategory(categoryArr[2])
                    setSelectedBySubCategory(categoryArr[3])
                })
                .catch(err => {
                    console.log("err = ", err)
                })
        }
    }, [])

    useEffect(() => {
        if (selectedCategory !== '') {
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
        }
    }, [selectedCategory])


    useEffect(() => {
        if (selectedSubCategory !== '') {
            getData(`category/${selectedSubCategory}`).then(result => {
                let data = result.subCategoryNames
                const newCategory = data.map((e, i) => ({
                    value: e.name,
                    label: e.name,
                    category: e.category
                }))
                setBySubCategory(newCategory)

                setPageLoad(prevValue => {
                    return { ...prevValue, ['isDataFetched']: false }
                })
            }).catch(err => {
                console.log(err)
            })
        }

    }, [selectedSubCategory])


    const handleSubmit = async (e, data) => {
        e.preventDefault()
        setLoader(true)
        validationSchema.validate(data).then(res => {
            if (!isEditProductMode) {
                saveData('product', data)
                    .then(response => {
                        setLoader(false)
                        alert(response.message)
                        e.target.reset();
                    }).catch(err => {
                        setLoader(false)
                        alert(err.message)
                    })
            }
            else {
                axiosPatch(`product/${productId}`, data)
                    .then(response => {
                        console.log(" res = ", response)
                        if (response.status) {
                            setLoader(false)
                            alert(response.message)
                            navigate('/view-products')
                        }
                    })
                    .catch(err => {
                        console.log("error = ", err)
                        setLoader(false)
                        alert(err.message)
                    })
            }
        })
            .catch(e => {
                setLoader(false)
                alert(e.message)
            })
    }

    useEffect(() => {

        async function getSellers() {
            const allSellers = await getData(`user/?role=seller&limit=1000`);

            allSellers?.users?.filteredUsers.forEach(seller => {
                console.log("initial = ", initialValues.sellerId === seller._id)

                if (initialValues.sellerId === seller._id) {
                    setSelectedSeller(seller.emailId)

                    // setTimeout(() => {
                    setPageLoad(prevValue => {
                        return { ...prevValue, ['isSellerSet']: false }
                    })
                    // }, 100)
                }

                setSellers(prevSellers => [...prevSellers, {

                    sellerId: seller._id,
                    label: seller.emailId,
                    value: seller.emailId
                }])
            });
        }
        if (user?.role === 'admin') {
            setSellers([]);
            getSellers();
        }

    }, [initialValues])


    console.log("initialValues = ", initialValues)
    return (
        <>
            {
                (pageLoad.isDataFetched && pageLoad.isSellerSet)
                    ?
                    <Loader />
                    :
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        enableReinitialize={true}
                    >
                        {({ values, setFieldValue }) => {
                            console.log("value = ", values)
                            return (
                                <>
                                    {loader && <Loader color="primary" />}

                                    <Form onSubmit={(e) => handleSubmit(e, values)}>
                                        {
                                            user?.role === 'admin'
                                                ?
                                                <div className='row'>
                                                    {console.log(" selected seller == ", selectedSeller)}
                                                    <div className='col-6 '>
                                                        <InputSelector
                                                            options={sellers}
                                                            onChange={
                                                                option => {
                                                                    setFieldValue("sellerId", option.sellerId)
                                                                }}
                                                            label={isEditProductMode ? "Seller" : "Select Seller"}
                                                            htmlFor="Seller"
                                                            name="sellerId"
                                                            defaultValue={{ label: selectedSeller, value: selectedSeller }}
                                                            disabled={isEditProductMode}
                                                        />
                                                        <CustomErrorMsg name="sellerId" />
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                        }

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

                                        <Field name="productDetails" component={ProductDetails} details={values.productDetails} />

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
                                                    defaultValue={{ label: selectedCategory, value: selectedCategory }}
                                                />
                                                <CustomErrorMsg name="category" />
                                            </div>

                                            <div className='col'>
                                                <InputSelector
                                                    htmlFor="subCategory"
                                                    label="Sub Category"
                                                    options={subCategory}
                                                    defaultValue={{ label: selectedSubCategory, value: selectedSubCategory }}
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
                                                    defaultValue={{ label: selectedBySubCategory, value: selectedBySubCategory }}
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
                                                                                placeholder="Enter No of Products"
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
                                                                                defaultValue={{ label: values?.variants?.[index]?.size, value: values?.variants?.[index]?.size }}
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
                                </>
                            )
                        }}

                    </Formik>

            }
        </>
    )

}

export default AddProductForm 