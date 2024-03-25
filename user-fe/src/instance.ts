import axios from "axios";
<<<<<<< HEAD
=======

>>>>>>> main
export const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 8000,
  withCredentials: true,
});
