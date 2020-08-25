import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const DeleteModal = (props) => {
  const {
    btnStyle,
    buttonLabel,
    className,
    handleDelete,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleDeleteClick = () => {
    handleDelete();
    setModal(!modal);
  }

  return (
    <div style={btnStyle}>
      <Button color="danger" size='lg' onClick={toggle}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Delete judge</ModalHeader>
        <ModalBody>
          Are you sure to delete selected judge?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteClick}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default DeleteModal;