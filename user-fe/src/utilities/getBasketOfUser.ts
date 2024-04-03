import { instance } from "@/instance";

export const getBasketById = async (token: string) => {
  try {
    const res = await instance.get(`/getBasketById`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.products;
  } catch (error) {
    console.error("error in getbasketdata", error);
  }
};
