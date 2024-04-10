import { instance } from "@/instance";
import { toastifyError, toastifySuccess } from "./toastify";

export const loginUser = async (
  data: {},
  router: Function,
  setToken: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await instance.post("signin", data);
    if (response.status == 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      setToken(response.data.accessToken);
      toastifySuccess("Signin succesfully");
      router("/");
    }
  } catch (error) {
    return toastifyError("The email or password is incorrect.");
  }
};

export const createUser = async (data: {}, router: Function) => {
  try {
    const response = await instance.post("signup", data);
    if (response.status == 201) {
      toastifySuccess("User created successfully");
      router("/signin");
    }
  } catch (error) {
    return toastifyError("The email is registered already");
  }
};

export const createAddress = async (
  data: {},
  token: String,
  router: Function
) => {
  try {
    const response = await instance.post(`/address`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.status == 201) {
      toastifySuccess("Хаяг амжилттай хадгалагдлаа");
      return response.data;
    }
  } catch (error) {
    return toastifyError("Хаяг үүсэж чадсангүй");
  }
};
