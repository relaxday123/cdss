/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import './cardcomponent.css';
import Accordion from 'react-bootstrap/Accordion';

function CardComponent({ data }) {

  const shortString = (str) => {
    if (str.length > 10) return str.substring(0, 170).concat(' ...');
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>{data.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header className='accordion-header'>Professional name</Accordion.Header>
              <Accordion.Body>{data.ProfName}</Accordion.Body>
            </Accordion.Item>
            {data.Synonyms ? 
            <Accordion.Item eventKey="1">
              <Accordion.Header className='accordion-header'>Synonyms</Accordion.Header>
              <Accordion.Body>{data.Synonyms.split(',').join(', ')}</Accordion.Body>
            </Accordion.Item> : ''}
            <Accordion.Item eventKey="2">
              <Accordion.Header className='accordion-header'>Description</Accordion.Header>
              <Accordion.Body>{data.Description}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className='accordion-header'>Medical condition</Accordion.Header>
              <Accordion.Body>{data.MedicalCondition}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header className='accordion-header'>Possible symptoms</Accordion.Header>
              <Accordion.Body>{data.PossibleSymptoms.split(',').join(', ')}</Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header className='accordion-header'>Treatment description</Accordion.Header>
              <Accordion.Body>{data.TreatmentDescription}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Card style={{ width: '23rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Card.Img variant="top" src={data.img} style={{ width: 'auto', height: '12rem', maxWidth: '30rem', padding: '1rem', border: '1px transparent', borderRadius: '2rem' }}/>
        </div>
        <Card.Body>
          <Card.Title>{data.Name}</Card.Title>
          <Card.Text>
            {shortString(data.DescriptionShort)}
          </Card.Text>
          <Button variant="primary" onClick={handleShow}>See details</Button>
        </Card.Body>
      </Card>
    </>
  );
}

export default CardComponent;
