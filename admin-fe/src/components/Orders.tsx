import { OrderType } from "@/types/orderType";
import React from "react";

export const Orders = ({ orderData }: { orderData: OrderType[] }) => {
  return (
    <div className="w-5/6">
      {orderData.map((el) => {
        return <div>{el.products[0].name}</div>;
      })}
    </div>
  );
};
