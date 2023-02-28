import InputRadio from '../atoms/InputRadio'
import InputImageUploder from '../atoms/InputImageUploder'
import Input from '../atoms/Input'
import InputSelector from '../atoms/InputSelector'
import { useFormik } from 'formik'
import { Button } from 'reactstrap'
import { useState } from 'react'


const initialValues = {
    pname: "",
    brand: "",
    category: "",
    price: "",
    gender:"",
    varient: {
        filename: "",
        vfilename: "",
        price: "",
        quantity: "",
        size: "",
    }
  
};

const options = [
    { value: 'Tops', label: 'Tops' },
    { value: 'Kurtas', label: 'Kurtas' },
    { value: 'Handbags', label: 'Handbags' },
    { value: 'Sarees', label: 'Sarees' },
    { value: 'Shirts', label: 'Shirts' },
    { value: 'Jewellery', label: 'Jewellery' }
]

const AddProductForm = () => {
    const [variantData, setVariantData] = useState([{ filename: "", vfilename: "", price: "", quantity: "", size: "" }])
    const handleVarientClick = () => {
        setVariantData([...variantData,
        {
            vfilename: '',
            price: '',
            quantity: '',
            size: ''
        }])
        console.log(variantData)
    }

 

    const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
        initialValues: initialValues,
        onSubmit: (values) => {
            console.log(values)
            console.log(variantData)
        }
    })

    return (
        <>

            <form onSubmit={handleSubmit} >
                <div className="row">
                    <div className='col'>
                        <Input label="Product Name"
                            forHtml="pname"
                            type='text'
                            placeholder="Enter Product name"
                            id='pname'
                            name='pname'
                            defaultValue={values.pname}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className='col'>
                        <Input label="Brand"
                            forHtml="brand"
                            type='text'
                            placeholder="Enter Brand name"
                            id='brand'
                            name='brand'
                            defaultValue={values.brand}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <InputSelector
                            id="category"
                            type="text"
                            value={values.category}
                            onChange={handleChange}
                            options={options}
                            onBlur={handleBlur}

                        />
                    </div>
                    <div className="col">
                        <Input label="Price"
                            forHtml="price"
                            type='text'
                            placeholder="Enter Price"
                            id='price'
                            name='price'
                            defaultValue={values.price}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                    </div>
                </div>
                <div className="row">
                    <div className="form-group col">
                        <label>Gender</label><br />
                        <InputRadio id="radio1" name="gender" value="male"  defaultChecked={values.gender} label="Male"  onChange={handleChange}
                            onBlur={handleBlur}/>
                        <InputRadio id="radio2" name="gender" value="female" defaultChecked={values.gender} label="Female"  onChange={handleChange}
                            onBlur={handleBlur} />
                        <InputRadio id="radio3" name="gender" value="other"  defaultChecked={values.gender} label="Other"  onChange={handleChange}
                            onBlur={handleBlur} />
                    </div>
                    <div className="col">
                        <InputImageUploder
                            label="Choose image"
                            forHtml="file"
                            type='file'
                            placeholder=""
                            id='myFile'
                            name='filename'
                            defaultValue={values.filename}
                            onChange={handleChange}
                            onBlur={handleBlur}

                        />
                    </div>
                </div>

                <Button color='primary' onClick={handleVarientClick} >Add varient+</Button>

                {variantData.map((item, index) => {
                    return (

                        <div key={index} className="border mt-5">
                            <div className=" d-flex justify-content-between align-items-center p-4">
                                <div> <h5 className="" ><strong> Option {index}</strong></h5></div>
                                <div ><strong style={{ cursor: 'pointer' }}>x</strong></div>
                            </div>


                            <div className="mt-2 d-flex justify-content-around align-items-center">

                                <InputImageUploder label="Choose image"
                                    forHtml="file"
                                    type='file'
                                    id='myFile'
                                    name='vfilename'
                                    defaultValue={values.varient.vfilename}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />


                                <Input label="Price"
                                    forHtml="price"
                                    type='number'
                                    placeholder="Enter Product Price"
                                    id='price'
                                    name='price'
                                    defaultValue={values.varient.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}

                                />

                                <Input label="Quantity"
                                    forHtml="quantity"
                                    type='number'
                                    placeholder="Enter Product Price"
                                    id='quantity'
                                    name='quantity'
                                    defaultValue={values.varient.quantity}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <Input label="Size"
                                    forHtml="size"
                                    type='text'
                                    placeholder="Enter Product Size"
                                    id='size'
                                    name='size'
                                    defaultValue={values.varient.size}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                            </div>

                        </div>

                    )
                })}
                <div className='mt-5' >
                    <Button type='submit' color='primary'>Submit</Button>
                </div>
            </form>

        </>
    )
}

export default AddProductForm