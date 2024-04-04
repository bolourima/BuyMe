import axios from "axios";

export const instance = axios.create({
  baseURL: "https://buyme-x6zl.onrender.com",
  timeout: 8000,
  withCredentials: true,
});
