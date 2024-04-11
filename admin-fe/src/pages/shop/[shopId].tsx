import { calculateTotal } from "@/helper/calculateTotal";
import { totalIncome } from "@/helper/totalIncome";
import { instance } from "@/instance";
import { OrderType } from "@/types/orderType";
import { toastifyWarning } from "@/utilities/toastify";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
type Params = {
  shop: string;
};
type Props = {
  orderData: OrderType[];
};
const Shop = ({ orderData, id }: { orderData: OrderType[]; id: string }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filteredOrderData, setFilteredOrderData] = useState<OrderType[]>([]);
  const filterByDate = async () => {
    try {
      const response = await instance.post(`/filterByDate`, {
        endDate: endDate,
        startDate: startDate,
        id: id,
      });
      setFilteredOrderData(response.data.orderData);
    } catch (error) {
      console.error("error in filter by date", error);
    }
  };
  useEffect(() => {
    if (startDate && endDate) {
      filterByDate();
    }
  }, [startDate, endDate]);
  const displayArray = !startDate && !endDate ? orderData : filteredOrderData;
  return orderData.length == 0 ? (
    <p className="w-full min-h-screen flex justify-center items-center pb-32">
      Хараахан захиалга байхгүй байна
    </p>
  ) : (
    <div className="min-h-screen py-12 px-4 flex flex-col items-center">
      <div className="w-10/12 flex justify-between items-center mb-8">
        <p className="text-xl font-semibold">Orders:</p>
        <p className="font-semibold text-xl">
          Total income:{" "}
          {totalIncome(
            displayArray.filter((el) => {
              return el.paymentStatus === "PAID";
            })
          ).toLocaleString()}
        </p>
      </div>
      <div className="flex justify-center items-center mb-6 space-x-4">
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate ? startDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setStartDate(new Date(e.target.value))}
        />
        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          value={endDate ? endDate.toISOString().split("T")[0] : ""}
          onChange={(e) => setEndDate(new Date(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-32 w-10/12">
        {displayArray.map((order) => (
          <div
            key={order._id}
            className="bg-white rounded-md shadow-md overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">
                Order Number: {order.orderNumber}
              </h2>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-600">Total: {order.total}₮</p>
                <p className="text-gray-600">
                  Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="flex justify-between items-center mb-4 gap-4">
                <p
                  className={`text-white p-3 rounded-xl ${
                    order.deliveryStatus === "PENDING" && "bg-blue-500"
                  } ${order.deliveryStatus === "SHIPPED" && "bg-orange-500"} ${
                    order.deliveryStatus === "DELIVERED" && "bg-green-500"
                  }`}
                >
                  Status: {order.deliveryStatus}
                </p>
                <p
                  className={`text-white p-3 rounded-xl ${
                    order.paymentStatus === "PAID"
                      ? "bg-green-500"
                      : "bg-orange-500"
                  }`}
                >
                  Payment: {order.paymentStatus}
                </p>
              </div>
              <div className="border-b border-gray-300"></div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Products</h3>
                {order.products.map((product) => (
                  <div key={product.product._id} className="mb-2 gap-4">
                    <p className="text-gray-800 px-4">
                      Name: {product.product.name}
                    </p>
                    <p className="text-gray-600 px-4">
                      Quantity: {product.selectedProductQuantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Shop;
export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  params
) => {
  const id = params.query.shopId;
  const shopRelatedData = await instance.get(
    `/shopRelatedData/${params.query.shopId}`
  );
  const orderData = shopRelatedData.data.orderData;
  return {
    props: {
      orderData,
      id,
    },
  };
};
