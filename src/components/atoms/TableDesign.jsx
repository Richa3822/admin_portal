import React from 'react';
import { Table } from 'reactstrap';
import Button, { ButtonType } from './Button';

const TableDesign = () => {
    return (
        <Table hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Product Name</th>
                    <th>Brand</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Gender</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    <td className='d-flex justify-content-between border-0'>
                        <div>
                            <Button ButtonType={ButtonType.DELETE} />
                        </div>
                        <div>
                            <Button ButtonType={ButtonType.EDIT} />
                        </div>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
}

export default TableDesign