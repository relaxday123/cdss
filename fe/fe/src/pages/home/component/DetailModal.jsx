/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Table } from 'antd';
import 'antd/dist/reset.css';
import './detailmodal.css';
import { Descriptions } from 'antd';

function DetailModal({ data, show, onClose }) {

  // const items = [
  //   {
  //     key: '1',
  //     label: 'Age',
  //     children: 'Cloud Database',
  //   },
  //   {
  //     key: '2',
  //     label: 'Sex',
  //     children: 'Prepaid',
  //   },
  //   {
  //     key: '3',
  //     label: 'Date',
  //     children: 'YES',
  //   },
  //   {
  //     key: '4',
  //     label: 'Chest pain type',
  //     children: '2018-04-24 18:00:00',
  //   },
  //   {
  //     key: '5',
  //     label: 'Resting blood pressure',
  //     children: '2019-04-24 18:00:00',
  //     span: 2,
  //   },
  //   {
  //     key: '6',
  //     label: 'Cholesteral',
  //     children: <Badge status="processing" text="Running" />,
  //     span: 3,
  //   },
  //   {
  //     key: '7',
  //     label: 'Fasting blood sugar (< 120)',
  //     children: '$80.00',
  //   },
  //   {
  //     key: '8',
  //     label: 'Resting ecg',
  //     children: '$20.00',
  //   },
  //   {
  //     key: '9',
  //     label: 'Max heart rate',
  //     children: '$60.00',
  //   },
  //   {
  //     key: '10',
  //     label: 'Exercise induced angina',
  //     children: '',
  //   },
  //   {
  //     key: '11',
  //     label: 'Oldpeak',
  //     children: '',
  //   },
  //   {
  //     key: '12',
  //     label: 'Slope',
  //     children: '',
  //   },
  //   {
  //     key: '13',
  //     label: 'No. vessels colored',
  //     children: '',
  //   },
  //   {
  //     key: '14',
  //     label: 'Thal',
  //     children: '',
  //   },
  // ];

  // const columns = [
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //   },
  //   {
  //     title: 'Sex',
  //     dataIndex: 'sex',
  //   },
  //   {
  //     title: 'Date',
  //     dataIndex: 'date',
  //     width: 110,
  //   },
  //   {
  //     title: 'Chest pain type',
  //     dataIndex: 'cp',
  //   },
  //   {
  //     title: 'Resting blood pressure',
  //     dataIndex: 'trestbps',
  //   },
  //   {
  //     title: 'Cholesteral',
  //     dataIndex: 'chol',
  //   },
  //   {
  //     title: 'Fasting blood sugar (< 120)',
  //     dataIndex: 'fbs',
  //   },
  //   {
  //     title: 'Resting ecg',
  //     dataIndex: 'restecg',
  //   },
  //   {
  //     title: 'Max heart rate',
  //     dataIndex: 'thalach',
  //   },
  //   {
  //     title: 'Exercise induced angina',
  //     dataIndex: 'exang',
  //   },
  //   {
  //     title: 'Oldpeak',
  //     dataIndex: 'oldpeak',
  //   },
  //   {
  //     title: 'Slope',
  //     dataIndex: 'slope',
  //   },
  //   {
  //     title: 'No. vessels colored',
  //     dataIndex: 'ca',
  //   },
  //   {
  //     title: 'Thal',
  //     dataIndex: 'thal',
  //   },
  // ];

  return (
    <>
      <Modal show={show} onHide={onClose} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Record detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Table columns={columns} dataSource={[data]} pagination={{
          position: ['none', 'none'],
        }} /> */}
          <Descriptions title="" layout="vertical" bordered column={4}>
            <Descriptions.Item className='des-label' label="Age">{data.age}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Sex">{data.sex}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Date">{data.date}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Chest pain type">{data.cp.split('').map((char, index) =>index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Resting blood pressure">{data.trestbps}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Cholesteral">{data.chol}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Fasting blood sugar (< 120)">{data.fbs.split('').map((char, index) =>index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Resting ecg">{data.restecg.split('').map((char, index) =>index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Max heart rate">{data.thalach}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Exercise induced angina">{data.exang.split('').map((char, index) =>index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Oldpeak">{data.oldpeak}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Slope">{data.slope.split('').map((char, index) =>index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="No. vessels colored">{data.ca}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Thal">{data.thal.split('').map((char, index) =>index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Description">{data.Description}</Descriptions.Item>
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

export default DetailModal;
