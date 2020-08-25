import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, FormGroup, Label } from 'reactstrap';

const LoginModal = (props) => {
var name = '';
var password = '';
var remember = false;

  const {
    btnStyle,
    buttonLabel,
    className,
    handleLogin,
    handleLogout,
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleLoginClick = () => {
        handleLogin(name, password, remember);
        setModal(!modal);
  }

  const nameChange = (e) => {
      e.preventDefault();
      name = e.target.value;
  }

  const passwordChange = (e) => {
    e.preventDefault();
    password = e.target.value;
  }

  const handleRememberCheck = (e) => {
    remember = !remember;
  }

  const handleLogoutClick = () => {
    handleLogout();
  }

  return (
    <div style={btnStyle} id="loginForm">
      {(buttonLabel == 'Login')?(
      <div>
          <Button color="link" size='md' onClick={toggle}>{buttonLabel}</Button>
          <Form >
            <Modal isOpen={modal} toggle={toggle} className={className} size="sm">
              <ModalHeader toggle={toggle}>Login</ModalHeader>
              <ModalBody>
                    <FormGroup>
                        <Input type='email' name="name" id="name" onChange={nameChange} defaultValue={name} 
                          placeholder="Email"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Input type='password' name="password" id="password" onChange={passwordChange} defaultValue={password} 
                          placeholder="Password"
                        />
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input type="checkbox" onChange={handleRememberCheck}/>{' '}
                        Remember me
                      </Label>
                    </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={handleLoginClick}>Login</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
          </Modal>
        </Form>
      </div>
    ):(
      <Button color="link" size='md' onClick={handleLogoutClick}>{buttonLabel}</Button>
    )}
    </div>
  );
}

export default LoginModal;