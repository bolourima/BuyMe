import { instance } from "@/instance";

export const refresh = async () => {
  try {
    const res = await instance.get("/refreshToken");
    return localStorage.setItem("accessToken", res.data.accessToken);
  } catch (error) {
    console.error("error in refreshToken", error);
  }
};
