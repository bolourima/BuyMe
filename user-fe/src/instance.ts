import axios from "axios";
import { toastifyError } from "./utilities/toastify";
const deployedBackEnd = "https://buyme-x6zl.onrender.com";
const localBackEnd = "http://localhost:8000";
export const instance = axios.create({
  baseURL: deployedBackEnd,
  timeout: 8000,
});

export const createUser = async (data: {}, router: Function) => {
  try {
    const response = await instance.post("signup", data);
    if (response.status == 201) {
      router("/");
    }
  } catch (error) {
    return toastifyError("Хэрэглэгч үүсгэхэд алдаа гарлаа");
  }
};
