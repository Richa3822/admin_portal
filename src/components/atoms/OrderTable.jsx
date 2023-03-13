import React from 'react'
import { Table } from 'reactstrap';
import Button, { ButtonType } from './Button';

function OrderTable({ data, setData }) {

    return (
        <Table hover>
            <thead>
                <tr>
                    <th style={{ width: "5%" }}>#</th>
                    <th style={{ width: "18%" }}>Order Id</th>
                    <th style={{ width: "10%" }}>Total Products</th>
                    <th style={{ width: "15%" }}>Order Date</th>
                    <th style={{ width: "7%" }}>Status</th>
                    <th style={{ width: "17%" }}>Customer Contact No.</th>
                    <th style={{ width: "13%" }}>Total</th>
                    <th style={{ width: "7%" }}>Payment</th>
                </tr>
            </thead>

            <tbody>
                {
                    data?.map((order, index) => {
                        const { oid, totalProducts, orderDate, total, status, payment, customerNo } = order;

                        return (
                            <tr key={oid} >
                                <th scope="row">{index + 1}</th>
                                <td className='ellipsis' ><span>{oid}</span></td>
                                <td className='ellipsis' ><span>{totalProducts}</span></td>
                                <td className='ellipsis' ><span>{orderDate}</span></td>
                                <td className='ellipsis' ><span className={`badge badge-pill ${getColorByOrderStatus(status)}`} >{status}</span></td>
                                <td className='ellipsis' ><span >{customerNo}</span></td>
                                <td className='ellipsis' ><span>{total}</span></td>
                                <td className='ellipsis' ><span className={`badge badge-pill ${getColorByPayment(payment)}`}>{payment}</span></td>

                                <td className='d-flex justify-content-between border-0'>
                                    <div>
                                        <Button ButtonType={ButtonType.DELETE} />
                                    </div>
                                    <div>
                                        <Button ButtonType={ButtonType.EDIT} />
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