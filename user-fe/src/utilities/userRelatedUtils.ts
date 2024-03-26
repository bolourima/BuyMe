import { instance } from "@/instance";

export const loginUser = async (data: {}, router: Function) => {
  try {
    const response = await instance.post("signin", data);
    if (response.status == 200) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return router("/");
    }
  } catch (error) {
    return alert("Эмайл хаяг эсвэл нууц үг буруу байна");
  }
};

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
