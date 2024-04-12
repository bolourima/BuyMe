import axios from "axios";
const deployedBackEnd = "https://buyme-x6zl.onrender.com";
const localBackEnd = "http://localhost:8000";
export const instance = axios.create({
  baseURL: localBackEnd,
  timeout: 8000,
});
