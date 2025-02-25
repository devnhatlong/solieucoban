import axios from "axios";

const instance = axios.create({
  baseURL: process.env.VUE_APP_ROOT_API,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export default instance;
