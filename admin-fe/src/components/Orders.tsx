import { calculateTotal } from "@/helper/calculateTotal";
import { OrderType, productTypeForShop } from "@/types/orderType";

export const Orders = ({
  orderData,
  orderDataForAdmin,
}: {
  orderData: productTypeForShop[];
  orderDataForAdmin: OrderType[];
}) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full border-collapse">
        <thead>
          {orderData.length != 0 ? (
            <tr className="bg-gray-200">
              <th className="p-3">User</th>
              <th className="p-3">Order Number</th>
              <th className="p-3">Products</th>
              <th className="p-3">Total</th>
              <th className="p-3">Created at</th>
            </tr>
          ) : (
            <tr className="bg-gray-200">
              <th className="p-3">User</th>
              <th className="p-3">Order Number</th>
              <th className="p-3">Products</th>
              <th className="p-3">Total</th>
              <th className="p-3">Address</th>
              <th className="p-3">Delivery status</th>
              <th className="p-3">Payment status</th>
              <th className="p-3">Created at</th>
              <th className="p-3">Updated at</th>
            </tr>
          )}
        </thead>
        <tbody>
          {orderData.length != 0
            ? orderData.map((order) => (
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
                              Quantity:
                              {productsWithQty.selectedProductQuantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-3">{order[0].total?.toLocaleString()}₮</td>
                  <td className="p-3">
                    {new Date(order[0].createdAt).toLocaleString()}
                  </td>
                </tr>
              ))
            : orderDataForAdmin.map((order) => {
                return (
                  <tr key={order.orderNumber} className="border-b">
                    <td className="p-3">{order.user.name}</td>
                    <td className="p-3">{order.orderNumber}</td>
                    <td className="p-3">
                      <div className="flex flex-wrap gap-4">
                        {order.products.map((productsWithQty, i) => {
                          return (
                            <div className="flex flex-col">
                              <p className="text-green-500">
                                {order.products[i].product.shopId.shopName}
                              </p>
                              <p>{productsWithQty.product.name}</p>
                              <div className="flex">
                                <img
                                  className="w-16 h-16"
                                  src={productsWithQty.product.images[0]}
                                  alt={productsWithQty.product.images[0]}
                                />
                              </div>
                              <p>{productsWithQty.selectedProductQuantity}</p>
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="p-3">{order.total.toLocaleString()}₮</td>
                    <td className="p-3">{order.address?.addressName}</td>
                    <td className="p-3">
                      <p
                        className={`text-white w-fit p-2 rounded-lg ${
                          order.deliveryStatus === "PENDING" && "bg-blue-500"
                        } ${
                          order.deliveryStatus === "SHIPPED" && "bg-orange-500"
                        } ${
                          order.deliveryStatus === "DELIVERED" && "bg-green-500"
                        }`}
                      >
                        {order.deliveryStatus}
                      </p>
                    </td>
                    <td className="p-3">
                      <p
                        className={`p-2 rounded-lg text-white ${
                          order.paymentStatus === "UNPAID"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                      >
                        {order.paymentStatus}
                      </p>
                    </td>
                    <td className="p-3">{order.createdAt.toString()}</td>
                    <td>{order.updatedAt.toString()}</td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};
