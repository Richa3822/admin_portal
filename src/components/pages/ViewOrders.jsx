import React, { useEffect, useState } from 'react'
import Button, { ButtonType } from '../atoms/Button'
import OrderTable from '../atoms/OrderTable'
import axios from 'axios'
import InputSelector from '../molecules/InputSelector'
import OrderNavbar from '../molecules/OrderNavbar'
import Pagination from "../molecules/Pagination";
import { Formik } from 'formik'
const ViewOrders = ({ }) => {
    const [data, setData] = useState([])
    const [orderscount, setOrdersCount] = useState(0);
 
    const [initialValues,setInitialValues]= useState({
        status:"all"
    });
    const [temp,setTemp]= useState()
    const options = [
        {value:"all",label:"All"},
        { value: "pending", label: "Pending" },
        { value: "hold", label: "Hold" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
        { value: "deleted", label: "Deleted" }
    ];

   



    useEffect(() => {
        fetchData("http://localhost:4000/api/order/admin")
    }, [temp]);

    async function fetchData(url) {
        
        if(temp === "all"){
            setTemp(null);
        }
        let response = await axios.get(url, { params: { limit: 10,status:temp } })
        setData(response.data.details);
        setOrdersCount(response.data.count);
        console.log(response.data);
    }

    const handlePageClick = (e) => {
        console.log(e)
    }

    return (
        <div className='mt-2 rounded border'>
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <h5>
                            <strong> Update Order</strong>
                        </h5>
                    </div>
                </div>
            </div>
            <div className='row ml-1'>
                <div className='col-2'>
                    <Formik initialValues={initialValues}>
                        {
                            ({values,setFieldValue}) => {
                                {
                                    console.log(values);
                                }
                                return <InputSelector
                                    options={options}
                                    value={values.status}
                                    name="status"
                                    onChange={(option) => {
                                        setFieldValue('status', option.value)
                                        setTemp(option.value);
                                    }}
                                    defaultValue={{ value: values.status, label: `${values.status.charAt(0).toUpperCase() + values.status.slice(1)}` }}
                                    
                                />

                            }
                        }

                    </Formik>

                </div>
            </div>

            {/* <OrderNavbar /> */}
            {/* <hr /> */}
            <div className='mt-3 mb-3 ml-2' >Total Orders  = {orderscount}</div>
            <div className='d-flex justify-content-around align-items-center'>
                <OrderTable data={data} setData={setData} />
            </div>
            <Pagination totalCount={100} limit={10} />
        </div>
    )
}

export default ViewOrders