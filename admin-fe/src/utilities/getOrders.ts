import { instance } from "@/instance";
import { OrderType, productTypeForShop } from "@/types/orderType";

export const getOrders = async (
  token: string,
  setOrder: (data: productTypeForShop[]) => void
) => {
  try {
    const res = await instance.get("/getOrdersInAdmin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOrder(res.data.order);
  } catch (error) {
    console.error("error in getOrders", error);
  }
};
