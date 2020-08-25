import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';

const AddModal = (props) => {
var name = '';

  const {
    btnStyle,
    buttonLabel,
    className,
    handleAdd
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleAddClick = () => {
        handleAdd(name);
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
        <ModalHeader toggle={toggle}>Add new judge</ModalHeader>
        <ModalBody>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type='text' name="name" id="name" onChange={nameChange} defaultValue={name} />
                </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleAddClick}>Add</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Form>
    </div>
  );
}

export default AddModal;