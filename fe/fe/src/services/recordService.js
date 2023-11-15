import instance from '../httpClient/axiosInstance';
import AuthHeaders from './AuthHeader';

const getDefault = () => {
  return instance.get('/records', {
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

const submitRecord = data => {
  return instance.post(`/records`, data, {
    headers: AuthHeaders(),
  });
};

const calculateRecord = data => {
  return instance.post(`/apriori/run`, data, {
    headers: AuthHeaders(),
  });
};

const diagnoseRecord = id => {
  return instance.post(`/diagnose/${id}`, {
    headers: AuthHeaders(),
  });
};

const deleteRecord = id => {
  return instance.delete(`/records/${id}`, { headers: AuthHeaders() });
};

const RecordService = {
  getDefault,
  //   getByID,
  //   getListBySearchKey,
  submitRecord,
  deleteRecord,
  calculateRecord,
  diagnoseRecord,
};

export default RecordService;
