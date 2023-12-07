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
    </>
  );
}

export default HomePage;
