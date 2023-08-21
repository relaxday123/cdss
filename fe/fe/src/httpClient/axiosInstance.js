import axios from "axios";
import { CONFIG } from "./config";
import { showErrorMessage } from "../util/toastdisplay";

const instance = axios.create({
  baseURL: CONFIG.baseUrl,
});

instance.interceptors.response.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    const { response } = error;
    const status = response.status;

    // Kiểm tra mã lỗi có phải là 401 hoặc 403 hay không
    if (status === 401 || status === 403) {
      // Chúng ta sẽ Thực hiện kịch bản refresh token tại đây
      showErrorMessage("Token has expired, please log in");
      setTimeout(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }, 2000);
    }

    return Promise.reject(error);
  }
);

export default instance;
