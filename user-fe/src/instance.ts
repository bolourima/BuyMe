import axios from "axios";
export const instance = axios.create({
  baseURL: "https://buyme-x6zl.onrender.com",
  timeout: 8000,
  withCredentials: true,
});

export const createUser = async (data: {}, router: Function) => {
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
