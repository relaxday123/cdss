/* eslint-disable react/prop-types */
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { Table } from 'antd';
import "antd/dist/reset.css";
import "./detailmodal.css";
import { Descriptions } from "antd";

function DetailModal({ data, show, onClose }) {
  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        dialogClassName="custom-modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Record detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Table columns={columns} dataSource={[data]} pagination={{
          position: ['none', 'none'],
        }} /> */}
          <Descriptions title="" layout="vertical" bordered column={4}>
            <Descriptions.Item className="des-label" label="Name">
              {data.user.name}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Email">
              {data.user.email}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Age">
              {data.age}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Sex">
              {data.sex}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Date">
              {data.date}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Chest pain type">
              {data.cp
                .split("")
                .map((char, index) => (index === 0 ? char.toUpperCase() : char))
                .join("")}
            </Descriptions.Item>
            <Descriptions.Item
              className="des-label"
              label="Resting blood pressure"
            >
              {data.trestbps}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Cholesteral">
              {data.chol}
            </Descriptions.Item>
            <Descriptions.Item
              className="des-label"
              label="Fasting blood sugar (< 120)"
            >
              {data.fbs
                .split("")
                .map((char, index) => (index === 0 ? char.toUpperCase() : char))
                .join("")}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Resting ecg">
              {data.restecg
                .split("")
                .map((char, index) => (index === 0 ? char.toUpperCase() : char))
                .join("")}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Max heart rate">
              {data.thalach}
            </Descriptions.Item>
            <Descriptions.Item
              className="des-label"
              label="Exercise induced angina"
            >
              {data.exang
                .split("")
                .map((char, index) => (index === 0 ? char.toUpperCase() : char))
                .join("")}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Slope">
              {data.slope
                .split("")
                .map((char, index) => (index === 0 ? char.toUpperCase() : char))
                .join("")}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Conclusion">
              {data.conclusion &&
                data.conclusion
                  .split("")
                  .map((char, index) =>
                    index === 0 ? char.toUpperCase() : char
                  )
                  .join("")}
            </Descriptions.Item>
            <Descriptions.Item className="des-label" label="Description">
              {data.description &&
                data.description
                  .split("")
                  .map((char, index) =>
                    index === 0 ? char.toUpperCase() : char
                  )
                  .join("")}
            </Descriptions.Item>
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
