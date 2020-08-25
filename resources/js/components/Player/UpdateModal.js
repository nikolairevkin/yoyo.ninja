import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';

const UpdateModal = (props) => {
var name = '';

  const {
    btnStyle,
    buttonLabel,
    className,
    handleUpdate,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleUpdateClick = () => {
        handleUpdate(name);
        setModal(!modal);
  }

  const nameChange = (e) => {
      e.preventDefault();
      name = e.target.value;
  }

  return (
    <div style={btnStyle}>
      <Button color="primary" size='lg' onClick={toggle}>{buttonLabel}</Button>
    <Form>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Update player</ModalHeader>
        <ModalBody>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type='text' name="name" id="name" onChange={nameChange} defaultValue={name} />
                </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateClick}>Update</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Form>
    </div>
  );
}

export default UpdateModal;