import axios from "axios";
import { API_URL } from "./constants";
// console.log("abcd", process.env.REACT_APP_API_KEY);

const instance = axios.create({
  baseURL: API_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

export default instance;
