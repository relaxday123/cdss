import instance from "../httpClient/axiosInstance";
import AuthHeaders from "./AuthHeader";

const postContact = (data) => {
  return instance.post("/contact", data, {
    headers: AuthHeaders(),
  });
};

const staffGetContactList = () => {
  return instance.get("/contact", {
    headers: AuthHeaders(),
  });
};

const getByID = (id) => {
  return instance.get(`/records/${id}`, {
    headers: AuthHeaders(),
  });
};

// const getListBySearchKey = data => {
//   return instance.post('/assignments/search', data, {
//     headers: AuthHeaders(),
//   });
// };

// const getByID = id => {
//   return instance.get(`/assignments/${id}`, {
//     headers: AuthHeaders(),
//   });
// };

const submitRecord = (data) => {
  return instance.post(`/records`, data, {
    headers: AuthHeaders(),
  });
};

const editRecord = (data) => {
  return instance.put(`/records`, data, {
    headers: AuthHeaders(),
  });
};

const calculateRecord = (data) => {
  return instance.post(`/apriori/run`, data, {
    headers: AuthHeaders(),
  });
};

const deleteRecord = (id) => {
  return instance.delete(`/records/${id}`, { headers: AuthHeaders() });
};

const ContactService = {
  postContact,
  staffGetContactList,
  getByID,
  editRecord,
  //   getListBySearchKey,
  submitRecord,
  deleteRecord,
  calculateRecord,
};

export default ContactService;
