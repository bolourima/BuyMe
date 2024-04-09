import { instance } from "@/instance";
import { OrderType, productTypeForShop } from "@/types/orderType";
import { Dispatch, SetStateAction } from "react";

export const getOrders = async (
  token: string,
  setOrderData: Dispatch<SetStateAction<productTypeForShop[]>>,
  setOrderDataForAdmin: Dispatch<SetStateAction<OrderType[]>>
) => {
  try {
    const res = await instance.get("/getOrdersInAdmin", {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.data.subAdmin) setOrderData(res.data.order);
    else setOrderDataForAdmin(res.data.order);
  } catch (error) {
    console.error("error in getOrders", error);
  }
};
