import { OrderType } from "@/types/orderType";
import React from "react";

export const Orders = ({ orderData }: { orderData: OrderType[] }) => {
  return (
    <table className="table-autod w-5/6">
      <thead>
        <tr>
          <th>User</th>
          <th>OrderNumber</th>
          <th>Products</th>
          <th>Total</th>
          <th>Created at</th>
        </tr>
      </thead>
      <tbody>
        {orderData.map((el) => {
          return (
            <tr>
              <td>{el.user.name}</td>
              <td>{el.orderNumber}</td>
              <td className="flex gap-2">
                {el.products.map((selection) => {
                  return (
                    <div className="flex flex-col gap-2">
                      <p>{selection.product.name}</p>
                      <img
                        className="w-16 h-16"
                        src={selection.product.images[0]}
                      />
                      <p>{selection.selectedProductQuantity}</p>
                    </div>
                  );
                })}
              </td>
              <td>{el.total.toLocaleString()}</td>
              <td>{el.createdAt.toString()}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
