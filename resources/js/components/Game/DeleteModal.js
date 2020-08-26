import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import $ from 'jquery';

const DeleteModal = (props) => {
  const {
    btnStyle,
    buttonLabel,
    className,
    handleDelete,
    checked,
  } = props;

  const [modal, setModal] = useState(false);

  const toggleOpen = () => {
    if(checked.length < 1) {
      $("div.alert").html("No game Selected!");
      $("div.alert").fadeIn('500').delay('2000').fadeOut('500');
    } else {
      setModal(!modal);
    }
  }

  const toggleClose = () => {
    setModal(!modal);
  }

  const handleDeleteClick = () => {
    handleDelete();
    setModal(!modal);
  }

  return (
    <div style={btnStyle}>
      <Button color="danger" size='lg' onClick={toggleOpen}>{buttonLabel}</Button>
      <Modal isOpen={modal} toggle={toggleOpen} className={className}>
        <ModalHeader toggle={toggleOpen}>Delete game</ModalHeader>
        <ModalBody>
          Are you sure to delete selected game?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleDeleteClick}>Delete</Button>{' '}
          <Button color="secondary" onClick={toggleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <div className="alert"></div>
    </div>

  );
}

export default DeleteModal;