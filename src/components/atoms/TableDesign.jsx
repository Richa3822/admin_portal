import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Spinner, Table } from 'reactstrap';
import { LIMIT } from '../../constants/Constant';
import { deleteData } from '../../services/Api';
import DeleteConfirmation from '../molecules/DeleteConfirmation';
import Button, { ButtonType } from './Button';

const TableDesign = ({ data, page = 1, setDeletedId }) => {
    const [open, setOpen] = useState(false);
    const [deleteProductInfo, setDeleteProductInfo] = useState({ productId: "", variantId: "" });

    const toggle = () => setOpen(!open);

    const confirmation = async (confirm) => {
        toggle();

        if (confirm) {
            try {
                const url = `product/variant/${deleteProductInfo?.variantId}`
                const body = {
                    id: deleteProductInfo?.productId
                }

                const deletedProduct = await deleteData(url, body)

                const { status, message } = deletedProduct;

                if (status) {
                    setDeletedId(deleteProductInfo?.variantId)
                }
                else {
                    alert(`error: ${message}, please try again`);
                }
            } catch (e) {
                alert("error occur, please try again");
            }
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
                <tbody>
                    {
                        data?.map((product, index) => {
                            const { name, category, brand, variant, productDetails } = product;
                            const { price, size, color } = variant

                            return (
                                <tr key={product._id + index} >
                                    <th scope="row">{(page * LIMIT) + index + 1}</th>
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
                                            <Link to={`/view-products/${product._id}`} >
                                                <Button ButtonType={ButtonType.EDIT} />
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>

            </Table>


            <DeleteConfirmation open={open} confirmation={confirmation} toggle={toggle} />

        </>
    );
}

export default TableDesign