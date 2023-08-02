/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import 'antd/dist/reset.css';
import './homepage.css';
import { Table, Popconfirm } from 'antd';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import DetailModal from './component/DetailModel'
import RecordService from '../../services/recordService';
import { showErrorMessage, showSuccessMessage } from '../../util/toastdisplay';

function HomePage() {

  const columns = [
    {
      title: 'No.',
      dataIndex: 'no',
      // sortDirections: ['ascend' | 'descend' | 'ascend'],
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.no - b.no,
      width: 80,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      // defaultSortOrder: 'descend',
      // sortDirections: ['ascend' | 'descend' | 'ascend'],
      sorter: (a, b) => a.age - b.age,
      width: 200,
    },
    {
      title: 'Sex',
      dataIndex: 'sex',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Prediction',
      dataIndex: 'prediction',
    },
    {
      title: 'Confidence (%)',
      dataIndex: 'confidence',
      width: 140,
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      render: (_, record) =>
        data.length >= 1 ? (
          <div style={{ display: 'flex', justifyContent: 'space-evenly'}}>
            <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
              <Button variant='danger'>Delete</Button>
            </Popconfirm>

            <DetailModal data={record} show={show} setShow={setShow}/>
            <Button variant='primary' onClick={handleShowModalDetail}>Detail</Button>
          </div>
        ) : null,
      width: 250,
    },
  ];

  const [show, setShow] = useState(false);

  const handleShowModalDetail = () => setShow(true);
  const handleCloseModalDetail = () => setShow(false);

  const handleDelete = (id) => {
    RecordService.deleteRecord(id)
      .then(response => {
        showSuccessMessage('Delete Record successfully !');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch(error => {
        showErrorMessage('Error: ' + error.response.data);
      });
  };

  const [data, setData] = useState([]);

  const setDataList = list => {
    let dataList = [];
    list.map((e, index) => {
      dataList.push({
        no: index + 1,
        id: e.id,
        age: e.age,
        sex: e.sex,
        cp: e.cp,
        trestbps: e.trestbps,
        chol: e.chol,
        fbs: e.fbs,
        restecg: e.restecg,
        thalach: e.thalach,
        exang: e.exang,
        oldpeak: e.oldpeak,
        slope: e.slope,
        ca: e.ca,
        thal: e.thal,
        classify: e.classify,
        date: e.date,
      });
    });

    setData(dataList);
  };

  const getDefaultList = () => {
    RecordService.getDefault()
      .then(response => {
        setDataList(response.data);
        console.log(response.data);
      })
      .catch(() => {
        setData([]);
      });
  };

  useEffect(() => {
    getDefaultList();
  }, []);

  return (
    <>
      <div style={{ width: '70%' }}>
        <Table columns={columns} dataSource={data} />
      </div>
    </>
  );
}

export default HomePage;
