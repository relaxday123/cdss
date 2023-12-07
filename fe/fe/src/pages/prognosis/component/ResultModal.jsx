/* eslint-disable react/prop-types */
import Alert from "react-bootstrap/Alert";
import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Descriptions } from "antd";

const ResultModal = ({
  calResult,
  showResultModal: show,
  setShowResultModal,
}) => {
  const [conclusion, setConclusion] = useState("");

  useEffect(() => {
    calConclusion();
  }, [calResult]);

  const calConclusion = () => {
    const buff = calResult.filter((result) => result.consequent == "buff");
    const sick = calResult.filter((result) => result.consequent == "sick");

    if (buff.length == 0 && sick.length == 0) {
      setConclusion("");
    } else if (buff.length == 0) {
      setConclusion(
        "The patient is " + "likely".toUpperCase() + " to have heart disease"
      );
    } else if (sick.length == 0) {
      setConclusion(
        "The patient is " + "unlikely".toUpperCase() + " to have heart disease"
      );
    } else if (
      sick.sort(compare).at(0).support + sick.sort(compare).at(0).confidence >
      buff.sort(compare).at(0).support + buff.sort(compare).at(0).confidence
    ) {
      setConclusion(
        "The patient is " + "likely".toUpperCase() + " to have heart disease"
      );
    } else {
      setConclusion(
        "The patient is " + "unlikely".toUpperCase() + " to have heart disease"
      );
    }
  };

  function compare(a, b) {
    if (a.confidence + a.support < b.confidence + b.support) {
      return 1;
    }
    if (a.confidence + a.support > b.confidence + b.support) {
      return -1;
    }
    return 0;
  }

  return (
    <Modal
      show={show}
      onHide={() => {
        setShowResultModal(false);
      }}
      dialogClassName="custom-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Result</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Alert
          style={{ width: "30%", height: "fit-content" }}
          variant="success"
        >
          <Alert.Heading>Conclusion</Alert.Heading>
          <hr />
          <div>{conclusion}</div>
        </Alert>

        <Alert style={{ width: "100%", backgroundColor: "white", border: "none" }}>
          <Alert.Heading>Rules</Alert.Heading>
          <hr />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
              <p style={{ fontWeight: "700", fontSize: "1.5rem", textAlign: "center" }}>Buff</p>
              {calResult
                .filter((result) => result.consequent === "buff")
                .sort(compare)
                .map((result) => {
                  return (
                    <div key={result.id} style={{ width: "100%", paddingBottom: "3rem" }}>
                      <Descriptions
                        title=""
                        layout="vertical"
                        bordered
                        column={1}
                      >
                        <Descriptions.Item
                          className="des-label"
                          label="Antecedent"
                        >
                          {result.antecedent}
                        </Descriptions.Item>
                      </Descriptions>
                        
                      <Descriptions
                        title=""
                        layout="vertical"
                        bordered
                        column={3}
                      >
                        <Descriptions.Item
                          className="des-label"
                          label="Support"
                        >
                          {result.support.toFixed(2)}
                        </Descriptions.Item>
                        <Descriptions.Item
                          className="des-label"
                          label="Confidence"
                        >
                          {result.confidence.toFixed(2)}
                        </Descriptions.Item>
                        <Descriptions.Item className="des-label" label="Total">
                          {(
                            parseFloat(result.confidence.toFixed(2)) +
                            parseFloat(result.support.toFixed(2))
                          ).toFixed(2)}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  );
                })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", width: "40%" }}>
              <p style={{ fontWeight: "700", fontSize: "1.5rem", textAlign: "center" }}>Sick</p>
              {calResult
                .filter((result) => result.consequent === "sick")
                .sort(compare)
                .map((result) => {
                  return (
                    <div key={result.id} style={{ width: "100%", paddingBottom: "3rem" }}>
                    <Descriptions
                      title=""
                      layout="vertical"
                      bordered
                      column={1}
                    >
                      <Descriptions.Item
                        className="des-label"
                        label="Antecedent"
                      >
                        {result.antecedent}
                      </Descriptions.Item>
                    </Descriptions>
                      
                    <Descriptions
                      title=""
                      layout="vertical"
                      bordered
                      column={3}
                    >
                      <Descriptions.Item
                        className="des-label"
                        label="Support"
                      >
                        {result.support.toFixed(2)}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className="des-label"
                        label="Confidence"
                      >
                        {result.confidence.toFixed(2)}
                      </Descriptions.Item>
                      <Descriptions.Item className="des-label" label="Total">
                        {(
                          parseFloat(result.confidence.toFixed(2)) +
                          parseFloat(result.support.toFixed(2))
                        ).toFixed(2)}
                      </Descriptions.Item>
                    </Descriptions>
                    </div>
                  );
                })}
            </div>
          </div>
        </Alert>
      </Modal.Body>
    </Modal>
  );
};

export default ResultModal;
