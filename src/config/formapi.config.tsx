import axios from "axios";

const token = localStorage.getItem("token")
  ? localStorage.getItem("token")
  : "";

export default axios.create({
  baseURL: process.env.REACT_APP_HOST_API,
  headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  },
});
