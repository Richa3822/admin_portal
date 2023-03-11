import React, { useEffect, useState } from 'react'
import { Button, Table } from 'reactstrap';
import InputLabel from '../atoms/InputLabel';
import *as Yup from 'yup'
import CustomErrorMsg from '../atoms/CustomErrorMsg';


const ProductDetails = ({ field, form, ...props
}) => {
    const { setFieldValue } = form
    const [key, setKey] = useState('')
    const [value, setValue] = useState('')
    const [productDetails, setProductDetails] = useState({})

    const handleClick = () => {
        setProductDetails(prev => {
            return { ...prev, [key]: value }
        })
        setKey('')
        setValue('')
    }


    const handleDelete = (keyToDelete) => {
        const updatedDetails = { ...productDetails };
        delete updatedDetails[keyToDelete];
        setProductDetails(updatedDetails);
        setFieldValue("productDetails", updatedDetails)
    };

    const objectLength = Object.keys(productDetails).length
    //the state update with setProductDetails is asynchronous,
    //productDetails state immediately after calling setProductDetails, it may not have updated yet.

    useEffect(() => {
        setFieldValue("productDetails", productDetails)
    }, [productDetails]);

    return (
        <div>
            <div className='row '>
                <div className='form-group col'>
                    <InputLabel forHtml="key" label="Product details" />
                    <input name="key" className='form-control' placeholder='Enter Key' value={key} onChange={(e) => setKey(e.target.value)}   />
                    <CustomErrorMsg name={`productDetails.key`} />
                </div>
                <div className='form-group col'>
                    <InputLabel forHtml="value" label="Value" />
                    <input name="value" className='form-control' placeholder='Enter value' value={value} onChange={(e) => setValue(e.target.value)}  />
                </div>
                <div className='add-button'>
                    <Button color='primary' onClick={handleClick}>+</Button>
                </div>
            </div>

            {objectLength > 0 ?
                <Table hover className='shadow mt-5'>
                    <thead >
                        <tr className='border-0'>
                            <th>key</th>
                            <th>value</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(productDetails).map((element, index) => {
                            return (
                                <tr key={index}>
                                    <td>{element}</td>
                                    <td>{productDetails[element]}</td>
                                    <td >
                                        <Button color='primary' className='float-right' onClick={() => handleDelete(element)} >X</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                : null}
        </div>
    )
}
export default  ProductDetails