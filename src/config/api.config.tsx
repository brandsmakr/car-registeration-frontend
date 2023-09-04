import axios from "axios";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

// const JsonApi = (method: string) => {
//   return axios.create({
//     baseURL: process.env.API_URL,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "application/json",
//     },
//     method: method
//   });
// };

// const FormApi = () => {
//   return axios.create({
//     baseURL: process.env.API_URL,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       "Content-Type": "multipart/form-data",
//     },
//   });
// };

// const ApiConfig = {
//   JsonApi,
//   FormApi,
// };

export default axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    // "Content-Type": "multipart/form-data",
  },
});



// export default ApiConfig