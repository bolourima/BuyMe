import { instance } from "@/instance";

export const getUserInfo = async (
  token: string,
  getUser: (data: any) => void
) => {
  try {
    const res = await instance.get("/getUserInfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    getUser(res.data.user);
    // return res.data.user;
  } catch (error) {
    console.error("error in getUserInfo", error);
  }
};
