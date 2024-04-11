import { OrderType } from "@/types/orderType";

export const totalIncome = (orderDataForAdmin: OrderType[]) => {
  const total = orderDataForAdmin.reduce((acc, cur) => {
    return acc + cur.total;
  }, 0);
  return total;
};
