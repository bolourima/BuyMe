import { instance } from "@/instance";
import { OrderType } from "@/types/orderType";
import { toastifyError } from "@/utilities/toastify";

export const getOrders = async (
  token: string,
  setOrderData: (orderData: OrderType[]) => void
) => {
  try {
    const res = await instance.get("/getOrdersOfUser", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrderData(res.data);
  } catch (error) {
    toastifyError("error in get order");
  }
};
