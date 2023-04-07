import React, { useEffect, useState } from 'react'
import { Table } from 'reactstrap';
import Button, { ButtonType } from './Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import DeleteConfirmation from '../molecules/DeleteConfirmation';
import Loader from '../atoms/Loader'
import { LIMIT, ORDER_URL, UPDATE_ORDER_URL } from '../../constants/Constant';
import { FetchOrders, UpdateOrders } from '../../services/Order';
import moment from 'moment';



function OrderTable({ data, changeData,filter ,changeCount,search}) {
    let [_Id, set_Id] = useState("");
    console.log(search)
    let [showLoader, setShowLoader] = useState(false);
    let [showDeleteModal, setShowDeleteModal] = useState(false);
    let navigate = useNavigate()

    const toggle = () => {
        setShowDeleteModal(!showDeleteModal);
    }
    const confirmDelete = async (confirm) => {
        toggle();
        if (confirm) {
            await UpdateOrders(UPDATE_ORDER_URL, { _Id, status: "deleted" });
            navigate('/view-orders')
            const updatedResponse = await FetchOrders(ORDER_URL, { params: { limit: LIMIT ,search} });
            const orders = updatedResponse.data.details;
            changeData(orders);
            changeCount(updatedResponse.data.count);


        }

    }


    return (
        <>
            {
                showLoader ? <Loader /> :
                    <>
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
                                        const { _Id, orderDate, deliveryDate, totalAmount, status, user: { contactNo } } = order;
                                        const totalProducts = order.products.length;
                                        return (

                                            <tr key={_Id} >

                                                <th scope="row">{index + 1}</th>
                                                <td className='ellipsis' ><span>{_Id}</span></td>
                                                <td className='ellipsis' ><span>{totalProducts}</span></td>
                                                <td className='ellipsis' ><span>{moment(orderDate).format("YYYY-MM-DD")}</span></td>
                                                <td className='ellipsis' ><span>{moment(deliveryDate).format("YYYY-MM-DD")}</span></td>
                                                <td className='ellipsis' ><span className={`badge badge-pill ${getColorByOrderStatus(status)}`} >{status}</span></td>
                                                <td className='ellipsis' ><span >{contactNo}</span></td>
                                                <td className='ellipsis' ><span>{totalAmount}</span></td>
                                                <td className='d-flex justify-content-between'>

                                                    <div onClick={() => {
                                                        set_Id(_Id);
                                                        toggle()
                                                    }}>
                                                        {filter!=='deleted'?<Button ButtonType={ButtonType.DELETE} >
                                                        </Button>:null}
                                                        
                                                    </div>


                                                    <div>
                                                        <Link to={{ pathname: "/update-order", search: _Id }} className='update-order-button'>
                                                            <Button ButtonType={ButtonType.EDIT}>
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

                        <DeleteConfirmation open={showDeleteModal} confirmation={confirmDelete} toggle={toggle} title="Delete Confirmation" /></>
            }

        </>
    );
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

        case 'deleted':
            color = "badge-dark"
            break;

        default:
            color = 'badge-light'
            break;

    }
    return color
}


export default OrderTable