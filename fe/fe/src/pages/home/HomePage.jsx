/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "antd/dist/reset.css";
import "./homepage.css";
import { Table, Popconfirm, Input, Space } from "antd";
import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DetailModal from "./component/DetailModal";
import RecordService from "../../services/recordService";
import { showErrorMessage, showSuccessMessage } from "../../util/toastdisplay";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";

function HomePage() {
  const { user } = useAuth();

  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      // sortDirections: ['ascend' | 'descend' | 'ascend'],
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.no - b.no,
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Age",
      dataIndex: "age",
      // defaultSortOrder: 'descend',
      // sortDirections: ['ascend' | 'descend' | 'ascend'],
      sorter: (a, b) => a.age - b.age,
      width: 200,
    },
    {
      title: "Sex",
      dataIndex: "sex",
    },
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Operation",
      render: (_, record) =>
        data.length >= 1 ? (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="primary"
              onClick={() => handleShowModalDetail(record)}
            >
              Detail
            </Button>

            {user.role[0].authority === "STAFF" && (
              <Link to={{ pathname: "/record/edit/" + record.id }}>
                <Button variant="primary">Edit and Predict</Button>
              </Link>
            )}

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.id)}
            >
              <Button variant="danger">Delete</Button>
            </Popconfirm>
          </div>
        ) : null,
      width: 350,
    },
  ];

  const [visibleRows, setVisibleRows] = useState({});

  const [diagnoseData, setDiagnoseData] = useState([]);

  const [showDiagnoseModal, setShowDiagnoseModal] = useState(false);

  const handleShowDiagnoseModal = (id) => {
    RecordService.diagnoseRecord(id)
      .then(response => {
        showSuccessMessage('Diagnose successfully !');
        setDiagnoseData(response.data);
        setShowDiagnoseModal(true);
      })
      .catch(error => {
        showErrorMessage('Error: ' + error.response.data);
      });
  };

  const handleShowModalDetail = (record) => {
    setVisibleRows((prevVisibleRows) => ({
      ...prevVisibleRows,
      [record.id]: true,
    }));
  };

  const handleCloseModalDetail = (record) => {
    setVisibleRows((prevVisibleRows) => ({
      ...prevVisibleRows,
      [record.id]: false,
    }));
  };

  const handleDelete = (id) => {
    RecordService.deleteRecord(id)
      .then((response) => {
        showSuccessMessage("Delete Record successfully !");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      })
      .catch((error) => {
        showErrorMessage("Error: " + error.response.data);
      });
  };

  const [data, setData] = useState([]);

  const setDataList = (list) => {
    let dataList = [];
    list.map((e, index) => {
      dataList.push({
        no: index + 1,
        id: e.id,
        age: e.age,
        sex:
          e.sex === "fem"
            ? "Female"
            : "Male"
                .split("")
                .map((char, index) => (index === 0 ? char.toUpperCase() : char))
                .join(""),
        cp: e.cp,
        trestbps: e.trestbps,
        chol: e.chol,
        fbs: e.fbs === "true" ? "True" : "False",
        restecg: e.restecg,
        thalach: e.thalach,
        exang: e.exang === "true" ? "True" : "False",
        oldpeak: e.oldpeak,
        slope: e.slope,
        ca: e.ca,
        thal: e.thal,
        classify: e.classify,
        date: e.date,
        user: e.user,
        name: e.user.name,
        description: e.description,
        conclusion: e.conclusion,
      });
    });

    setData(dataList);
  };

  const getDefaultList = () => {
    if (user.role[0].authority === "PATIENT") {
      RecordService.patientGetList()
        .then((response) => {
          setDataList(response.data);
        })
        .catch(() => {
          setData([]);
        });
    } else if (user.role[0].authority === "STAFF") {
      RecordService.staffGetList()
        .then((response) => {
          setDataList(response.data);
        })
        .catch(() => {
          setData([]);
        });
    }
  };

  useEffect(() => {
    getDefaultList();
  }, []);

  function compare(a, b) {
    if (a.confidence + a.support < b.confidence + b.support) {
      return 1;
    }
    if (a.confidence + a.support > b.confidence + b.support) {
      return -1;
    }
    return 0;
  }

  const [conclusion, setConclusion] = useState("");

  const calConclusion = () => {
    const buff = diagnoseData.rules.filter((result) => result.consequent == "buff");
    const sick = diagnoseData.rules.filter((result) => result.consequent == "sick");

    if (buff.length == 0 && sick.length == 0) {
      setConclusion("");
    } else if (buff.length == 0) {
      setConclusion("The patient is " + "likely".toUpperCase() +  " to have heart disease");
    } else if (sick.length == 0) {
      setConclusion("The patient is " + "unlikely".toUpperCase() +  " to have heart disease");
    } else if (
      sick.sort(compare).at(0).support + sick.sort(compare).at(0).confidence >
      buff.sort(compare).at(0).support + buff.sort(compare).at(0).confidence
    ) {
      setConclusion("The patient is " + "likely".toUpperCase() +  " to have heart disease");
    } else {
      setConclusion("The patient is " + "unlikely".toUpperCase() +  " to have heart disease");
    }
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <Table columns={columns} dataSource={data} />
      </div>

      {data.map((record) => (
        <DetailModal
          key={record.id}
          data={record}
          show={visibleRows[record.id] || false}
          onClose={() => handleCloseModalDetail(record)}
        />
      ))}

      <Modal show={showDiagnoseModal} onHide={() => setShowDiagnoseModal(false)} dialogClassName="custom-modal" centered>
        <Modal.Header closeButton>
          <Modal.Title>Diagnose</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <Table columns={columns} dataSource={[data]} pagination={{
          position: ['none', 'none'],
        }} /> */}
          <Descriptions title="" layout="vertical" bordered column={4}>
            <Descriptions.Item className='des-label' label="Age">{diagnoseData.age}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Sex">{diagnoseData.sex}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Date">{diagnoseData.date}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Chest pain type">{diagnoseData.cp.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Resting blood pressure">{diagnoseData.trestbps}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Cholesteral">{diagnoseData.chol}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Fasting blood sugar (< 120)">{diagnoseData.fbs.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Resting ecg">{diagnoseData.restecg.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Max heart rate">{diagnoseData.thalach}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Exercise induced angina">{diagnoseData.exang.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Oldpeak">{diagnoseData.oldpeak}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Slope">{diagnoseData.slope.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="No. vessels colored">{diagnoseData.ca}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Thal">{diagnoseData.thal.split('').map((char, index) => index === 0 ? char.toUpperCase() : char).join('')}</Descriptions.Item>
            <Descriptions.Item className='des-label' label="Description">{diagnoseData.Description}</Descriptions.Item>
            <Alert style={{ width: "50%" }} variant="success">
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
                      {diagnoseData.rules
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
                                total:{" "}
                                {(
                                  parseFloat(result.confidence.toFixed(2)) +
                                  parseFloat(result.support.toFixed(2))
                                ).toFixed(2)}
                              </li>
                            </ul>
                          );
                        })}
                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                      {diagnoseData.rules
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
                                total:{" "}
                                {(
                                  parseFloat(result.confidence.toFixed(2)) +
                                  parseFloat(result.support.toFixed(2))
                                ).toFixed(2)}
                              </li>
                            </ul>
                          );
                        })}
                    </div>
                  </div>
                </Alert>

                <Alert
                  style={{ width: "45%", height: "fit-content" }}
                  variant="success"
                >
                  <Alert.Heading>Conclusion</Alert.Heading>
                  <hr />
                  <div>{conclusion}</div>
                </Alert>
          </Descriptions>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDiagnoseModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default HomePage;
