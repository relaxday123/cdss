/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Table } from 'antd';
import 'antd/dist/reset.css';
import { useState } from 'react';
import './detailmodal.css';

function ModalComponent({ data, show, setShow }) {

  const handleClose = () => setShow(false);
  
  const [dataSrc] = useState([data]);

  const columns = [
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      width: 110,
    },
    {
      title: 'Chest pain type',
      dataIndex: 'cp',
    },
    {
      title: 'Resting blood pressure',
      dataIndex: 'trestbps',
    },
    {
      title: 'Cholesteral',
      dataIndex: 'chol',
    },
    {
      title: 'Fasting blood sugar (< 120)',
      dataIndex: 'fbs',
    },
    {
      title: 'Resting ecg',
      dataIndex: 'restecg',
    },
    {
      title: 'Max heart rate',
      dataIndex: 'thalach',
    },
    {
      title: 'Exercise induced angina',
      dataIndex: 'exang',
    },
    {
      title: 'Oldpeak',
      dataIndex: 'oldpeak',
    },
    {
      title: 'Slope',
      dataIndex: 'slope',
    },
    {
      title: 'No. vessels colored',
      dataIndex: 'ca',
    },
    {
      title: 'Thal',
      dataIndex: 'thal',
    },
  ];

  return (
    <>
    {console.log(data)}
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Record detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table key={data.id} columns={columns} dataSource={dataSrc} pagination={{
          position: ['none', 'none'],
        }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;
