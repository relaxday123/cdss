// import { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Form, Input, Popconfirm, Table } from "antd";
import ContactService from "../../services/contactService";
import { useNavigate } from "react-router-dom";
import { showErrorMessage, showSuccessMessage } from "../../util/toastdisplay";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import ContactDetailModal from "./component/ContactDetailModal";
import { Button } from "react-bootstrap";

const ContactPage = () => {
  const { user } = useAuth();
  let navigate = useNavigate();

  const onFinish = (values) => {
    ContactService.postContact(values)
      .then(() => {
        showSuccessMessage(
          "Submit contact successfully! We'll response to you soon"
        );
        setTimeout(() => {
          navigate("/contact");
        }, 2000);
      })
      .catch((error) => {
        showErrorMessage("Error: " + error.response.data[1]);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.no - b.no,
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 200,
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Operation",
      render: (_, contact) =>
        contactList.length >= 1 ? (
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button
              variant="primary"
              onClick={() => handleShowModalDetail(contact)}
            >
              Accept
            </Button>

            <Button
              variant="danger"
              onClick={() => handleShowModalDetail(contact)}
            >
              Decline
            </Button>
            
            <Button
              variant="primary"
              onClick={() => handleShowModalDetail(contact)}
            >
              Detail
            </Button>

            {/* {user.role[0].authority === "STAFF" && (
              <Link to={{ pathname: "/record/edit/" + record.id }}>
                <Button variant="primary">Edit and Predict</Button>
              </Link>
            )} */}

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(contact.id)}
            >
              <Button variant="danger">Delete</Button>
            </Popconfirm>
          </div>
        ) : null,
      width: 400,
    },
  ];

  const [visibleRows, setVisibleRows] = useState({});

  const handleShowModalDetail = (contact) => {
    setVisibleRows((prevVisibleRows) => ({
      ...prevVisibleRows,
      [contact.id]: true,
    }));
  };

  const handleCloseModalDetail = (contact) => {
    setVisibleRows((prevVisibleRows) => ({
      ...prevVisibleRows,
      [contact.id]: false,
    }));
  };

  // const handleDelete = (id) => {
  //   RecordService.deleteRecord(id)
  //     .then((response) => {
  //       showSuccessMessage("Delete Record successfully !");
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 2000);
  //     })
  //     .catch((error) => {
  //       showErrorMessage("Error: " + error.response.data);
  //     });
  // };

  const [contactList, setContactList] = useState([]);

  const pushContactList = (list) => {
    let dataList = [];
    list.map((e, index) => {
      dataList.push({
        id: e.id,
        no: index + 1,
        name: e.name,
        email: e.email,
        phone: e.phone,
        symptom: e.symptom,
      });
    });

    setContactList(dataList);
  };

  const getDefaultList = () => {
    if (user.role[0].authority === "STAFF") {
      ContactService.staffGetContactList()
        .then((response) => {
          pushContactList(response.data);
        })
        .catch(() => {
          setContactList([]);
        });
    }
  };

  useEffect(() => {
    getDefaultList();
  }, []);

  return user.role[0].authority === "PATIENT" ? (
    <div
      style={{ display: "flex", justifyContent: "center", paddingTop: "5rem" }}
    >
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 1000,
          width: "80%",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        size="large"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please enter your email!",
              type: "email",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
              pattern: "^[0-9-+]{9,15}$",
            },
          ]}
        >
          <Input style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="Symptom"
          name="symptom"
          rules={[
            {
              required: true,
              message: "Please enter your symptoms!",
            },
          ]}
        >
          <Input.TextArea
            showCount
            maxLength={200}
            style={{ height: "8rem" }}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 10,
            span: 16,
          }}
          style={{ paddingTop: "5rem" }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  ) : (
    <>
      <div style={{ width: "100%" }}>
        <Table columns={columns} dataSource={contactList} />
      </div>

      {contactList.map((contact) => (
        <ContactDetailModal
          key={contact.id}
          data={contact}
          show={visibleRows[contact.id] || false}
          onClose={() => handleCloseModalDetail(contact)}
        />
      ))}
    </>
  );
};

export default ContactPage;
