import React, { useEffect, useState } from 'react'
import OrderTable from '../atoms/OrderTable'
import InputSelector from '../molecules/InputSelector'
import Pagination from "../molecules/Pagination";
import { Formik } from 'formik'
import Card from "../atoms/Card"
import {FetchOrders}from "../../services/Order"
import { ORDER_URL } from '../../constants/Constant';

const ViewOrders = () => {
  
    const [data, setData] = useState([])
    const [orderscount, setOrdersCount] = useState(0);
    const [initialValues, setInitialValues] = useState({
        status: "all"
    });
    const [filter, setFilter] = useState()
    const options = [
        { value: "all", label: "All" },
        { value: "pending", label: "Pending" },
        { value: "hold", label: "Hold" },
        { value: "shipped", label: "Shipped" },
        { value: "delivered", label: "Delivered" },
        { value: "cancelled", label: "Cancelled" },
        { value: "deleted", label: "Deleted" }
    ];
    useEffect(() => {
        fetchData(ORDER_URL,10)
    }, [filter]);


    async function fetchData(url,limit) {
        if (filter === "deleted") {
            let response =await FetchOrders(url,{ params: { limit: limit, status: filter } })
            setData(response.data.details);
            setOrdersCount(response.data.count);
            return;
        }
        if (filter === "all") {
            setFilter(null);
        }
        else{
        let response =await FetchOrders(url, { params: { limit: limit, status: filter } })
        let orders = response.data.details;
        let notDeletedOrders = orders.filter((order) => {
            if (order.status !== 'deleted') {
                return order;
            }
        })
        setData(notDeletedOrders);
        setOrdersCount(notDeletedOrders.length);
        }
    }

    return (
        <div className='mt-2 rounded border'>
           <Card heading="Update Order"/>
            <div className='row ml-1'>
                <div className='col-2'>
                    <Formik initialValues={initialValues}>
                        {
                            ({ values, setFieldValue }) => {
                                {
                                    console.log(values);
                                }
                                return <InputSelector
                                    options={options}
                                    value={values.status}
                                    name="status"
                                    onChange={(option) => {
                                        setFieldValue('status', option.value)
                                        setFilter(option.value);
                                    }}
                                    defaultValue={{ value: values.status, label: `${values.status.charAt(0).toUpperCase() + values.status.slice(1)}` }}

                                />

                            }
                        }

                    </Formik>

                </div>
            </div>
            <div className='mt-3 mb-3 ml-3 pl-1' >Total Orders  = {orderscount}</div>
            <div className='d-flex justify-content-around align-items-center'>
                <OrderTable data={data} changeData= {(value)=>setData(value)} />
            </div>
            <Pagination totalCount={100} limit={10} />
        </div>
    )
}

export default ViewOrders