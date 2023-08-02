/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import './navbar.css';
// import 'antd/dist/reset.css';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import ValidatedChangePasswordForm from '../changepassword/ValidatedChangePasswordForm';


function Navbar(props) {

  const [showLogout, setShowLogout] = useState(false);
  const handleCloseLogout = () => {
    setShowLogout(false);
  };

  const handleLogout = () => {
    setShowLogout(false);
    localStorage.clear();
    window.location.href = '/';
  };
  
  const logoutModal = (
    <Modal show={showLogout} onHide={handleCloseLogout}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#046380' }}>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Do you want to log out?</div>
      </Modal.Body>
      <Modal.Footer>
        <div className="d-flex mx-4 flex-row-reverse">
          <Button variant="" onClick={handleCloseLogout} style={{ border: 'solid 1px #046380' }}>
            Cancel
          </Button>
          <Button
            className="d-flex mx-3 text-light shadow-none"
            onClick={handleLogout}
            style={{ backgroundColor: '#046380' }}
          >
            Logout
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );

  const [show, setShow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsSubmitted(false);
  };

  const successModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#046380' }}>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>Your password has been changed successfully!</div>
      </Modal.Body>
    </Modal>
  );

  const changePasswordModal = (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ color: '#046380' }}>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ValidatedChangePasswordForm
          show={show}
          setShow={setShow}
          isSubmitted={isSubmitted}
          setIsSubmitted={setIsSubmitted}
        />
      </Modal.Body>
    </Modal>
  );

  const handleChangePassword = () => setShow(true);

  const handleChangeLogout = event => {
    event.preventDefault();
    setShowLogout(true);
  };

  // const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: '#046380', marginBottom: '30px' }}
      >
        <div className="container-fluid container-fluid-custom">
          <a className="navbar-brand navbar-brand-custom" href="#" style={{ color: "whitesmoke" }}>
            {props.title}
          </a>

          <div id="navbarSupportedContent" className="support-content">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                {/* <a
                  className="nav-link dropdown-toggle toggle-custom"
                  onClick={() => setOpen(!open)}
                  aria-controls="example-collapse-text"
                  aria-expanded={open}
                >
                  {props.username}
                </a>
                <ul className="dropdown-menu" id="dropdown-menu">
                  <li>
                    <div className="dropdown-item" onClick={handleChangePassword}>
                      Change password
                    </div>
                    {isSubmitted ? successModal : changePasswordModal}
                  </li>
                  <li>
                    <div className="dropdown-item" onClick={handleChangeLogout}>
                      Logout
                    </div>
                    {logoutModal}
                  </li>
                </ul> */}
                
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic" style={{ backgroundColor: '#046380', border: 'none'}}>
                    {props.username}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <div>
                      <Dropdown.Item onClick={handleChangePassword}>Change password</Dropdown.Item>
                      {isSubmitted ? successModal : changePasswordModal}
                    </div>
                    <div>
                      <Dropdown.Item onClick={handleChangeLogout}>Logout</Dropdown.Item>
                      {logoutModal}
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
