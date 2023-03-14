import React from 'react'
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'

function DeleteConfirmation({ open, confirmation, toggle }) {

    const handleClick = (e) => {
        confirmation(JSON.parse(e.target.value));
    }

    return (
        <Modal isOpen={open} toggle={toggle} style={{transition: "-webkit-transform 0.3s ease-out" }} >
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                Are you sure, you want to delete ?
            </ModalBody>
            <ModalFooter>
                <Button color="primary" value={true} onClick={handleClick}>Yes</Button>{' '}
                <Button color="secondary" value={false} onClick={handleClick}>No</Button>
            </ModalFooter>
        </Modal>
    )
}

export default DeleteConfirmation