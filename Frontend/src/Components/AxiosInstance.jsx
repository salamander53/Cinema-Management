import axios from "axios";

const baseUrl = "http://20.249.67.154/";
const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

AxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("Token");
  // console.log("token: ", token);
  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  } else {
    config.headers.authorization = ``;
  }
  return config;
});

// AxiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       localStorage.removeItem("Token");
//       window.location.href = "/";
//     }
//   }
// );

export default AxiosInstance;
