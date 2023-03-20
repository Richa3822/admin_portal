import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import Button, { ButtonType } from './Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function OrderTable({ data, setData }) {
    let [_Id,set_Id]= useState("");

 
    useEffect((oid)=>{
        set_Id(oid);
    },[_Id])


    return (
        <Table hover>
            <thead>
                <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "20%" }}>Order Id</th>
                    <th style={{ width: "10%" }}>Total Products</th>
                    <th style={{ width: "14%" }}>Order Date</th>
                    <th style={{ width: "14%" }}>Delivery Date</th>
                    <th style={{ width: "8%" }}>Status</th>
                    <th style={{ width: "10%" }}>Contact No.</th>
                    <th style={{ width: "10%" }}>Total</th>
                </tr>
            </thead>

            <tbody>
                {
                   
                    data?.map((order, index) => {
                        const {_Id,orderDate,deliveryDate,totalAmount,status, user:{contactNo}} = order;
                        // const { contactNo } = user;
                        const totalProducts = order.products.length;
                        
                        // console.log(order);
                        ///const { oid, totalProducts, orderDate, total, status, payment, customerNo } = order;
                        return (
                            <tr key={_Id} >
                                <th scope="row">{index + 1}</th>
                                <td className='ellipsis' ><span>{_Id}</span></td>
                                <td className='ellipsis' ><span>{totalProducts}</span></td>
                                <td className='ellipsis' ><span>{orderDate}</span></td>
                                <td className='ellipsis' ><span>{deliveryDate}</span></td>
                                <td className='ellipsis' ><span className={`badge badge-pill ${getColorByOrderStatus(status)}`} >{status}</span></td>
                                <td className='ellipsis' ><span >{contactNo}</span></td>
                                <td className='ellipsis' ><span>{totalAmount}</span></td>
                                <td className='d-flex justify-content-between'>
                                
                                    <div>
                                       <Button ButtonType={ButtonType.DELETE} ></Button>    
                                    </div>
                                    
                                 
                                    <div>
                                        <Link  to={{pathname:"/update-order",search:_Id}} className='update-order-button'>
                                            <Button  ButtonType={ButtonType.EDIT}>
                                            </Button>
                                        </Link>
                                        
                                    </div>
        
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>

        </Table>
    );
}


function getColorByPayment(payment) {
    let color = 'badge-light'
    switch (payment) {
        case 'captured':
            color = 'badge-success'
            break;

        case 'cancelled':
            color = 'badge-danger'
            break;

        case 'pending':
            color = 'badge-warning'
            break;

        case 'refunded':
            color = 'badge-secondary'
            break;

        default:
            color = 'badge-light'
            break;
    }
    return color
}

function getColorByOrderStatus(status) {
    let color = 'badge-light'
    switch (status) {
        case 'delivered':
            color = 'badge-success'
            break;

        case 'cancelled':
            color = 'badge-danger'
            break;

        case 'pending':
            color = 'badge-warning'
            break;

        case 'shipped':
            color = 'badge-primary'
            break;

        case 'hold':
            color = 'badge-secondary'
            break;

        default:
            color = 'badge-light'
            break;
    }
    return color
}


export default OrderTable