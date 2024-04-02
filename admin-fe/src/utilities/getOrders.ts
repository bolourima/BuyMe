import { instance } from "@/instance";
import { OrderType } from "@/types/orderType";

export const getOrders = async (
  token: string,
  setOrder: (data: OrderType[]) => void
) => {
  try {
    const res = await instance.get("/getOrdersInAdmin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrder(res.data);
  } catch (error) {
    console.error("error in getOrders", error);
  }
};
