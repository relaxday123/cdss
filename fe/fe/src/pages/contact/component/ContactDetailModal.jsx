/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'antd/dist/reset.css';
import './contactdetailmodal.css';
import { Descriptions } from 'antd';

function ContactDetailModal({ data, show, onClose }) {
  return (
    <>
      <Modal show={show} onHide={onClose} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Descriptions title="" layout="vertical" bordered column={4}>
            <Descriptions.Item className='des-label' label="Name">{data.name}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Email">{data.email}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Phone">{data.phone}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Symptom" style={{ width: '50rem' }}>{data.symptom}</Descriptions.Item>
          </Descriptions>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ContactDetailModal;
