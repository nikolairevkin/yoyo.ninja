import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';
import $ from 'jquery';

const EditModal = (props) => {

  const {
    btnStyle,
    buttonLabel,
    className,
    handleEdit,
    checked,
  } = props;

  const [modal, setModal] = useState(false);

  const toggleOpen = () => {
    var checkedCount = checked.length;
    if(checkedCount !== 1) {
      if(checkedCount === 0) {
        $("div.alert").html('No judge selected!');
        $("div.alert").fadeIn('500').delay('3000').fadeOut('500');
      } else {
        $("div.alert").html('Select only one judge!');
        $("div.alert").fadeIn('500').delay('3000').fadeOut('500');        
      }
    }
    else {
      name = checked[0].name;
      setModal(!modal);
    }
  }

  const toggleClose = () => {
    setModal(!modal);
  }

  const handleEditClick = () => {
    handleEdit(name);
    setModal(!modal);
  }

  const nameChange = (e) => {
      e.preventDefault();
      name = e.target.value;
  }

  return (
    <div style={btnStyle}>
      <Button color="primary" size='lg' onClick={toggleOpen}>{buttonLabel}</Button>
    <Form>
      <Modal isOpen={modal} toggle={toggleOpen} className={className}>
        <ModalHeader toggle={toggleOpen}>Edit judge</ModalHeader>
        <ModalBody>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type='text' name="name" id="name" onChange={nameChange} defaultValue={name} />
                </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEditClick}>Edit</Button>{' '}
          <Button color="secondary" onClick={toggleClose}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </Form>
    <div className="alert"></div>
    </div>
  );
}

export default EditModal;