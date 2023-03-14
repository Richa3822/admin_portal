import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import DeleteConfirmation from '../molecules/DeleteConfirmation';
import Button, { ButtonType } from './Button';

const UserSellerTableDesign = ({ data, setData }) => {
    const [open, setOpen] = useState(false);
    const [deleteDataId, setDeleteDataId] = useState(null);

    const toggle = () => setOpen(!open);

    const confirmation = (confirm) => {
        toggle();
        if (confirm) {
            setData(prevData => prevData.filter(data => {
                return data._id !== deleteDataId
            }))

            // --> make api call
            console.log("api called, deleted------------ = ", data)
        }
        else {
            console.log("nothing to do------------")
        }

    }

    return (
        <>
            <Table hover>
                <thead>
                    <tr>
                        <th style={{ width: "5%" }}>#</th>
                        <th style={{ width: "30%" }}>Name</th>
                        <th style={{ width: "15%" }}>Contact No</th>
                        <th style={{ width: "40%" }}>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((person, index) => {
                            const { firstName, lastName, contactNumber, email } = person;

                            return (
                                <tr key={person._id} >
                                    <th scope="row">
                                        <span>
                                            {index + 1}
                                        </span>
                                    </th>

                                    <td className='ellipsis' scope="row">
                                        <span>
                                            {firstName + " " + lastName}
                                        </span>
                                    </td>
                                    <td className='ellipsis' scope="row">
                                        <span>
                                            {contactNumber}
                                        </span>
                                    </td>
                                    <td className='ellipsis' scope="row">
                                        <span>
                                            {email}
                                        </span>
                                    </td>

                                    <td className='d-flex justify-content-around border-0'>
                                        <div onClick={() => {
                                            setDeleteDataId(person._id)
                                            toggle();
                                        }} >
                                            <Button ButtonType={ButtonType.DELETE} />
                                        </div>
                                        <div>
                                            <Link to={`/view-user/${person['_id']}`} state={{ person }} >
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

export default UserSellerTableDesign