import React, { useState } from 'react'
import Button, { ButtonType } from '../atoms/Button'
import OrderTable from '../atoms/OrderTable'

import OrderNavbar from '../molecules/OrderNavbar'
const ViewOrders = () => {

    const [data, setData] = useState([
        {
            oid: "BBOR20230300001",
            totalProducts: 10,
            orderDate: '01/03/2023',
            total: 10000,
            status: 'pending',
            payment: 'cancelled',
            customerNo: "9389434893"
        },
        {
            oid: "BBOR20230300002",
            totalProducts: 10,
            orderDate: '01/03/2023',
            total: 10000,
            status: 'hold',
            payment: 'pending',
            customerNo: "9389434893"
        },
        {
            oid: "BBOR20230300003",
            totalProducts: 10,
            orderDate: '01/03/2023',
            total: 10000,
            status: 'shipped',
            payment: 'captured',
            customerNo: "9389434893"
        },
        {
            oid: "BBOR20230300003",
            totalProducts: 10,
            orderDate: '01/03/2023',
            total: 10000,
            status: 'cancelled',
            payment: 'refunded',
            customerNo: "9389434893"
        },
        {
            oid: "BBOR20230300004",
            totalProducts: 10,
            orderDate: '01/03/2023',
            total: 10000,
            status: 'delivered',
            payment: 'captured',
            customerNo: "9389434893"
        },
        {
            oid: "BBOR20230300005",
            totalProducts: 10,
            orderDate: '01/03/2023',
            total: 10000,
            status: 'cancelled',
            payment: 'N/A',
            customerNo: "9389434893"
        }
    ])

    return (
        <div className='mt-4'>
            <h5 className='ml-5'><strong> Order details</strong></h5>
            <OrderNavbar />
            <hr />
            <div className='d-flex justify-content-around align-items-center'>
                <OrderTable data={data} setData={setData} />
            </div>
        </div>
    )
}

export default ViewOrders