/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { showErrorMessage, showSuccessMessage } from "../../util/toastdisplay";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "bootstrap/dist/css/bootstrap.min.css";
import "./prognosispage.css";
import RecordService from "../../services/recordService";
import ResultModal from "./component/ResultModal";

function PrognosisPage() {
  let navigate = useNavigate();
  const { user } = useAuth();

  const [values, setValues] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [touched, setTouched] = useState({
    age: false,
    sex: false,
    cp: false,
    trestbps: false,
    chol: false,
    fbs: false,
    restecg: false,
    thalach: false,
    exang: false,
    oldpeak: false,
    slope: false,
    ca: false,
    thal: false,
  });

  const [errors, setErrors] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [calResult, setCalResult] = useState([]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
    validate(e);
  };

  const validate = (e) => {
    let { name, value } = e.target;
    setErrors((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "age":
          if (value === "") {
            stateObj[name] = "Please enter age.";
            console.log(errors.age);
          } else if (value < 20 || value > 79) {
            stateObj[name] = "Invalid value.";
            console.log(errors.age);
          }
          break;

        case "sex":
          if (value === "") {
            stateObj[name] = "Please enter sex.";
          }
          break;

        case "cp":
          if (value === "") {
            stateObj[name] = "Please choose.";
          }
          break;

        case "trestbps":
          if (value === "") {
            stateObj[name] = "Please enter.";
            console.log(errors.age);
          } else if (value < 90 || value > 200) {
            stateObj[name] = "Invalid value.";
            console.log(errors.age);
          }
          break;

        case "chol":
          if (value === "") {
            stateObj[name] = "Please enter.";
            console.log(errors.age);
          } else if (value < 10 || value > 300) {
            stateObj[name] = "Invalid value.";
            console.log(errors.age);
          }
          break;

        case "fbs":
          if (value === "") {
            stateObj[name] = "Please choose.";
          }
          break;

        case "restecg":
          if (value === "") {
            stateObj[name] = "Please enter";
          }
          break;

        case "exang":
          if (value === "") {
            stateObj[name] = "Please enter.";
          }
          break;

        case "oldpeak":
          if (value === "") {
            stateObj[name] = "Please enter.";
          }
          break;

        case "ca":
          if (value === "") {
            stateObj[name] = "Please enter.";
          }
          break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setButtonClicked(false);
      validate(e);
    } else {
      submitRecord(values);
    }
  };

  const handleCalculate = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      validate(e);
    } else {
      calculateRecord(values);
    }
  };

  const [validated, setValidated] = useState(false);

  const submitRecord = (data) => {
    RecordService.submitRecord(data)
      .then((response) => {
        showSuccessMessage("Submit record successfully!");
        setTimeout(() => {
          navigate("/");
          setButtonClicked(false);
        }, 2000);
      })
      .catch((error) => {
        showErrorMessage("Error: " + error.response.data);
      });
  };

  const [showResultModal, setShowResultModal] = useState(false);

  const calculateRecord = (data) => {
    RecordService.calculateRecord(data)
      .then((response) => {
        showSuccessMessage("Calculate successfully!");
        // console.log(response.data);
        setCalResult(response.data);
        setShowResultModal(true);
        // console.log(values);
        // setShow(true);
      })
      .catch((error) => {
        showErrorMessage("Error: " + error.response.data);
      });
  };

  const formValid =
    !errors.age &&
    !errors.sex &&
    !errors.cp &&
    !errors.trestbps &&
    !errors.chol &&
    !errors.fbs &&
    !errors.restecg &&
    !errors.thalach &&
    !errors.exang;

  const calValid =
    values.age != "" &&
    values.sex != "" &&
    values.cp != "" &&
    values.trestbps != "" &&
    values.chol != "" &&
    values.fbs != "" &&
    values.restecg != "" &&
    values.thalach != "" &&
    values.exang != "";

  const [isButtonClicked, setButtonClicked] = useState(false);

  return (
    <>
      <div className="assignment-page">
        <p
          style={{
            fontSize: "30px",
            color: "#046380",
            fontWeight: "600",
            paddingLeft: "6rem",
          }}
        >
          Enter data
        </p>
        <div style={{ paddingLeft: "6rem" }}>
          <Form validated={validated} onSubmit={handleFormSubmit}>
            <Form.Text className="note" muted>
              Our system evaluates based on the records that have been
              collected, and your profile will contribute to future prediction
              results.
            </Form.Text>
            <Row className="mb-2">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="label">Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.age && errors.age}
                  required
                />
                <Form.Text className="describe" id="age" muted>
                  Age must be between 20-79
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.age}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="label">Sex</Form.Label>
                <Form.Select
                  defaultValue=""
                  name="sex"
                  value={values.sex}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.sex && errors.sex}
                  required
                >
                  <option value={""}></option>
                  <option value={"male"}>Male</option>
                  <option value={"fem"}>Female</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.sex}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="label">Chest pain type</Form.Label>
                <Form.Select
                  defaultValue=""
                  name="cp"
                  value={values.cp}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.cp && errors.cp}
                  required
                >
                  <option value={""}></option>
                  <option value={"angina"}>Typical angina</option>
                  <option value={"abnang"}>Atypical angina</option>
                  <option value={"notang"}>Non-anginal pain</option>
                  <option value={"asympt"}>Asymptomatic</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.cp}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="label">
                  Resting blood pressure
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter resting blood pressure"
                  name="trestbps"
                  value={values.trestbps}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.trestbps && errors.trestbps}
                  required
                />
                <Form.Text className="describe" id="trestbps" muted>
                  Blood pressure must be between 90-200
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.trestbps}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="label">Cholesteral</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter cholesteral"
                  name="chol"
                  value={values.chol}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.chol && errors.chol}
                  required
                />
                <Form.Text className="describe" id="chol" muted>
                  Cholesteral must be between 10-300
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.chol}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="label">
                  Fasting blood sugar <span>{"< 120"}</span>
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  name="fbs"
                  value={values.fbs}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.fbs && errors.fbs}
                  required
                >
                  <option value={""}></option>
                  <option value={"true"}>Yes</option>
                  <option value={"fal"}>No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.fbs}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="label">
                  Resting electrocardiographic
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  name="restecg"
                  value={values.restecg}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.restecg && errors.restecg}
                  required
                >
                  <option value={""}></option>
                  <option value={"norm"}>Normal</option>
                  <option value={"abn"}>Abnormality</option>
                  <option value={"hyp"}>Hypertrophy</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.restecg}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label className="label">Max heart rate</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter max heart rate"
                  name="thalach"
                  value={values.thalach}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.thalach && errors.thalach}
                  required
                />
                <Form.Text className="describe" id="chol" muted>
                  Max heart rate must be between 10-300
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  {errors.thalach}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="label">
                  Exercise induced angina
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  name="exang"
                  value={values.exang}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.exang && errors.exang}
                  required
                >
                  <option value={""}></option>
                  <option value={"true"}>Yes</option>
                  <option value={"fal"}>No</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.exang}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              {/* <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className='label'>Oldpeak</Form.Label>
                <Form.Control type="number" placeholder="Enter oldpeak" name="oldpeak"
                  value={values.oldpeak}
                  onBlur={handleBlur}
                  isInvalid={touched.oldpeak && errors.oldpeak}
                  onChange={handleChange}
                  required />
                <Form.Control.Feedback type="invalid">
                  {errors.oldpeak}
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className="label">
                  Slope exercise ST segment
                </Form.Label>
                <Form.Select
                  defaultValue=""
                  name="slope"
                  value={values.slope}
                  onBlur={handleBlur}
                  isInvalid={touched.slope && errors.slope}
                  onChange={handleChange}
                  required
                >
                  <option value={""}></option>
                  <option value={"up"}>Upsloping</option>
                  <option value={"flat"}>Flat</option>
                  <option value={"down"}>Downsloping</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.slope}
                </Form.Control.Feedback>
              </Form.Group>

              {/* <Form.Group as={Col} xs={4} controlId="formGridEmail">
                <Form.Label className="label">
                  Major vessels (flourosopy)
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter major vessels"
                  name="ca"
                  value={values.ca}
                  onBlur={handleBlur}
                  isInvalid={touched.ca && errors.ca}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.ca}
                </Form.Control.Feedback>
              </Form.Group> */}
            </Row>

            <Row style={{ height: "7rem" }}>
              {/* <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label className='label'>Thal</Form.Label>
                <Form.Select defaultValue="" name="thal"
                  value={values.thal}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  isInvalid={touched.thal && errors.thal}
                  required>
                  <option value={""}></option>
                  <option value={"norm"}>Normal</option>
                  <option value={"fix"}>Fixed defect</option>
                  <option value={"rev"}>Reversable defect</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.thal}
                </Form.Control.Feedback>
              </Form.Group> */}

              <Form.Group
                as={Col}
                controlId="formGridPassword"
                xs={4}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  style={{ height: "3rem" }}
                  variant="primary"
                  type="submit"
                  className="submit-btn mb-3"
                  disabled={!formValid || isButtonClicked}
                >
                  {isButtonClicked ? "Submitting..." : "Submit"}
                </Button>

                <Button
                  style={{ height: "3rem" }}
                  variant="primary"
                  type="button"
                  className="submit-btn mb-3 mx-5"
                  disabled={!calValid || isButtonClicked}
                  onClick={handleCalculate}
                >
                  Calculate
                </Button>
              </Form.Group>

              <ResultModal calResult={calResult} showResultModal={showResultModal} setShowResultModal={setShowResultModal} />
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PrognosisPage;
