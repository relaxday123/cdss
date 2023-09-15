/* eslint-disable no-unused-vars */
import { SearchOutlined } from "@ant-design/icons";
import { DatePicker, Input } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
// import AssetService from '../../services/assetService';
// import AssignmentService from '../../services/assignmentService';
// import UserService from '../../services/userService';
import { showErrorMessage, showSuccessMessage } from "../../util/toastdisplay";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";
import "./prognosispage.css";
import * as formik from "formik";
import * as yup from "yup";
import RecordService from "../../services/recordService";

const { Search, TextArea } = Input;

function PrognosisPage() {
  let navigate = useNavigate();
  const { user } = useAuth();

  // useEffect(() => {
  // async function fetchData() {
  //   let userResponse = null;
  //   let assetResponse = null;
  //   try {
  //     // userResponse = await UserService.getUsersInAdminLocation(user.sub);
  //     // assetResponse = await AssetService.getValidAssetsForAssignment();
  //   } catch (error) {
  //     if (error.response.status === 400 || error.response.status === 401) {
  //       showErrorMessage('Your session has expired');
  //       localStorage.removeItem('token');
  //       navigate('/login');
  //     }
  //   }

  //   let returnedUsers = userResponse.data.map(user => {
  //     return {
  //       key: user.staffCode,
  //       staffCode: user.staffCode,
  //       fullName: user.lastName + ' ' + user.firstName,
  //       type: user.type,
  //     };
  //   });

  //   let returnedAssets = assetResponse.data.map(asset => {
  //     return {
  //       key: asset.code,
  //       assetCode: asset.code,
  //       name: asset.assetName,
  //       category: asset.categoryName,
  //     };
  //   });
  //   // setUserData(returnedUsers);
  //   // setAssetData(returnedAssets);
  // }
  // fetchData();
  // }, []);

  // const handleSubmit = async assignment => {
  //   try {
  //     // let response = await AssignmentService.createNewAssignment(assignment);
  //     showSuccessMessage('Assignemnt created successfully');
  //     // navigate('/assignment', {
  //     //   state: { createdAssignment: response.data, prePath: '/assignment/create' },
  //     // });
  //   } catch (error) {
  //     if (error.response.status === 400 || error.response.status === 401) {
  //       showErrorMessage('Your session has expired');
  //       localStorage.removeItem('token');
  //       navigate('/login');
  //     }
  //   }
  // };

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

        // case "fbs":
        //   if (value === '') {
        //     stateObj[name] = "Please enter sex.";
        //   }
        //   break;

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

        // case "slope":
        //   if (value === '') {
        //     stateObj[name] = "Please enter.";
        //   }
        //   break;

        case "ca":
          if (value === "") {
            stateObj[name] = "Please enter.";
          }
          break;

        // case "thal":
        //   if (value === '') {
        //     stateObj[name] = "Please enter.";
        //   }
        //   break;

        default:
          break;
      }

      return stateObj;
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setButtonClicked(true);
    // console.log(values);

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setButtonClicked(false);
      validate(e);
    } else {
      submitRecord(values);
    }

    // setValidated(true);
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

    // setValidated(true);
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

  const calculateRecord = (data) => {
    RecordService.calculateRecord(data)
      .then((response) => {
        showSuccessMessage("Calculate successfully!");
        console.log(response.data);
        setCalResult(response.data);
        console.log(values);
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
    !errors.exang
    //  && !errors.oldpeak && !errors.slope
    // && !errors.ca;

  const calValid =
    values.age != "" &&
    values.sex != "" &&
    values.cp != "" &&
    values.trestbps != "" &&
    values.chol != "" &&
    values.fbs != "" &&
    values.restecg != "" &&
    values.thalach != "" &&
    values.exang != ""
    //  && values.oldpeak != '' && values.slope != ''
    // && values.ca != "";

  const [isButtonClicked, setButtonClicked] = useState(false);

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
                <Form.Label className='label'>Slope exercise ST segment</Form.Label>
                <Form.Select defaultValue="" name="slope"
                  value={values.slope}
                  onBlur={handleBlur}
                  isInvalid={touched.slope && errors.slope}
                  onChange={handleChange}
                  required>
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

              <Form.Group
                as={Col}
                controlId="formGridPassword"
                xs={8}
                style={{ display: "flex", justifyContent: "flex-end" }}
              >
                {/* {calResult ? (
                  ""
                ) : ( */}
                  <Alert style={{ width: "100%" }} variant="success">
                    <Alert.Heading>Result</Alert.Heading>
                    <hr />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                      }}
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {calResult
                          .filter((result) => result.consequent === "buff")
                          .sort(compare)
                          .map((result) => {
                            return (
                              <ul key={result.id}>
                                <li>{result.consequent}</li>
                                <li>{result.id}</li>
                                <li>{result.antecedent}</li>
                                <li>support: {result.support.toFixed(2)}</li>
                                <li>
                                  confidence: {result.confidence.toFixed(2)}
                                </li>
                                <li>
                                  total: {result.confidence.toFixed(2) + result.support.toFixed(2)}
                                </li>
                              </ul>
                            );
                          })}
                      </div>

                      <div style={{ display: "flex", flexDirection: "column" }}>
                        {calResult
                          .filter((result) => result.consequent === "sick")
                          .sort(compare)
                          .map((result) => {
                            return (
                              <ul key={result.id}>
                                <li>{result.consequent}</li>
                                <li>{result.id}</li>
                                <li>{result.antecedent}</li>
                                <li>support: {result.support.toFixed(2)}</li>
                                <li>
                                  confidence: {result.confidence.toFixed(2)}
                                </li>
                                <li>
                                  total: {result.confidence.toFixed(2) + result.support.toFixed(2)}
                                </li>
                              </ul>
                            );
                          })}
                      </div>
                    </div>
                  </Alert>
                {/* )} */}
              </Form.Group>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PrognosisPage;
