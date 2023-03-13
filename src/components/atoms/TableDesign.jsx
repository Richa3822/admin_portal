import React from 'react';
import { Table } from 'reactstrap';
import React, { useState } from 'react';
import { Spinner, Table } from 'reactstrap';
import { deleteData } from '../../services/axios';
import DeleteConfirmation from '../molecules/DeleteConfirmation';
import Button, { ButtonType } from './Button';

const TableDesign = ({ data, setData }) => {
    const [open, setOpen] = useState(false);
    const [deleteProductInfo, setDeleteProductInfo] = useState({ productId: "", variantId: "" });

    const toggle = () => setOpen(!open);

    const confirmation = async (confirm) => {
        toggle();

        if (confirm) {
            console.log("api called, deleted------------ = ", data)
            try {
                const url = `/product/variant/${deleteProductInfo.variantId}`
                
                const deletedProduct = await deleteData(
                    {
                        url,
                        body: {
                            id: deleteProductInfo.productId
                        }
                    }
                )

                const { status, message } = deletedProduct;

                if (status) {
                    setData(prevData => prevData.filter(data => {
                        return data.variant._id !== deleteProductInfo.variantId
                    }))
                    alert(` ${message}`);
                }
                else {
                    alert(`error: ${message}, please try again`);
                }
            } catch (e) {
                alert("error occur, please try again");
            }
        }
        else {
            console.log("nothing to do------------");
        }

    }

    return (
        <>
            <Table hover>
                <thead>
                    <tr>
                        <th style={{ width: "5%" }}>#</th>
                        <th style={{ width: "15%" }}>Product Name</th>
                        <th style={{ width: "15%" }}>Brand</th>
                        <th style={{ width: "15%" }}>Price</th>
                        <th style={{ width: "10%" }}>Size</th>
                        <th style={{ width: "15%" }}>Color</th>
                        <th style={{ width: "20%" }}>Category</th>
                    </tr>
                </thead>
                {
                    data?.length != 0
                        ?
                        <tbody>
                            {
                                data?.map((product, index) => {
                                    const { name, category, variant, productDetails } = product;
                                    const { price, size, color } = variant

                                    // --> has to update it
                                    const { brand } = productDetails

                                    return (
                                        <tr key={product._id + index} >
                                            <th scope="row">{index + 1}</th>
                                            <td className='ellipsis' ><span>{name}</span></td>
                                            <td className='ellipsis' ><span>{brand}</span></td>
                                            <td className='ellipsis' ><span>{price}</span></td>
                                            <td className='ellipsis' ><span>{size}</span></td>
                                            <td className='ellipsis' ><span>{color}</span></td>
                                            <td className='ellipsis' ><span>{category}</span></td>

                                            <td className='d-flex justify-content-between border-0'>
                                                <div onClick={() => {
                                                    setDeleteProductInfo({
                                                        productId: product._id,
                                                        variantId: variant._id
                                                    })
                                                    toggle();
                                                }} >
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
                        :
                        null
                }

            </Table>
            {
                data?.length == 0
                    ?
                    <div className='d-flex justify-content-center w-100 h-50 mt-5 mb-5' >
                        <Spinner className='d-flex' />
                    </div>
                    :
                    null
            }
            
            <DeleteConfirmation open={open} confirmation={confirmation} toggle={toggle} />

        </>
    );
}

export default TableDesign