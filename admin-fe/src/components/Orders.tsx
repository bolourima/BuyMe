import { calculateTotal } from "@/helper/calculateTotal";
import { OrderType, productTypeForShop } from "@/types/orderType";
import React from "react";

export const Orders = ({ orderData }: { orderData: productTypeForShop[] }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-3">User</th>
            <th className="p-3">Order Number</th>
            <th className="p-3">Products</th>
            <th className="p-3">Total</th>
            <th className="p-3">Created at</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((order) => (
            <tr key={order[0].orderNumber} className="border-b">
              <td className="p-3">{order[0].user}</td>
              <td className="p-3">{order[0].orderNumber}</td>
              <td className="p-3">
                <div className="flex flex-wrap gap-4">
                  {order.map((productsWithQty, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold">
                          {productsWithQty.product.name}
                        </p>
                        <img
                          className="w-16 h-16 rounded-lg"
                          src={productsWithQty.product.images[0]}
                          alt={productsWithQty.product.name}
                        />
                        <p className="text-sm">
                          Quantity: {productsWithQty.selectedProductQuantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </td>
              <td className="p-3">{calculateTotal(order).toLocaleString()}₮</td>
              <td className="p-3">
                {new Date(order[0].createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
