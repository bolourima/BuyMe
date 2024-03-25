import axios from "axios";
export const instance = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 8000,
  withCredentials: true,
});

export const createUser = async (data: {}, router: Function) => {
  console.log("data", data);
  try {
    const response = await instance.post("signup", data);
    console.log("response", response);
    console.log("response.data", response.data);
    console.log("response.status", response.status);
    if (response.status == 201) {
      router("/");
    }
  } catch (error) {
    console.error("Failed to Create User");
    return alert("Хэрэглэгч үүсгэхэд алдаа гарлаа");
  }
};

export const loginUser = async (data: {}, router: Function) => {
  console.log("data", data);
  try {
    const response = await instance.post("signin", data);
    console.log("response", response);
    console.log("response.data", response.data);
    console.log("response.status", response.status);
    if (response.status == 200) {
      router("/");
    }
  } catch (error) {
    return alert("Эмайл хаяг эсвэл нууц үг буруу байна");
  }
};
