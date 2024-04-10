import { Qr } from "@/components/Qr";
import { TokenContext } from "@/context/TokenContext";
import { getOrders } from "@/helper/getOrders";
import { payPayment } from "@/helper/payPayment";
import { invoiceInitial } from "@/types/invoiceInitial";
import { InvoiceType } from "@/types/invoiceType";
import { OrderType } from "@/types/orderType";
import { toastifyError } from "@/utilities/toastify";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

const Order = () => {
  const router = useRouter();
  const [orderData, setOrderData] = useState<OrderType[]>([]);
  const [invoice, setInvoice] = useState<InvoiceType>(invoiceInitial);
  const setOrder = (orderData: OrderType[]) => {
    setOrderData(orderData);
  };
  const { token, setToken } = useContext(TokenContext);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toastifyError("Please sign in");
      router.push("/signin");
      return;
    }
    setToken(token);
    getOrders(token, setOrder);
  }, []);

  return (
    <div className="flex flex-col overflow-scroll px-32 h-fit">
      {invoice.invoice_id && <Qr invoice={invoice} setInvoice={setInvoice} />}
      {orderData.map((order) => {
        return (
          <div className="flex justify-between w-full h-fit items-center">
            <p>{order.orderNumber}</p>
            <p>{order.total.toLocaleString()}₮</p>
            <div className="flex gap-4">
              {order.products.map((productWithQuantity) => {
                return (
                  <div className="flex gap-2 flex-col items-center justify-center">
                    <img
                      className="w-48 h-48"
                      src={productWithQuantity.product.images[0]}
                      alt=""
                    />
                    <p>{productWithQuantity.selectedProductQuantity}</p>
                  </div>
                );
              })}
            </div>
            <p>{order.address?.addressName}</p>
            <p
              className={`text-white w-24 h-8 rounded-2xl flex justify-center items-center ${
                order.deliveryStatus === "PENDING" && "bg-blue-500"
              } ${order.deliveryStatus === "SHIPPED" && "bg-orange-500"} ${
                order.deliveryStatus === "Delivered" && "bg-green-500"
              }  ${order.deliveryStatus === "SHIPPED" && "bg-gray-500"}`}
            >
              {order.deliveryStatus}
            </p>
            {order.paymentStatus === "PAID" ? (
              <div className="w-24 h-8 rounded-2xl bg-green-400 text-white text-lg flex justify-center items-center">
                PAID
              </div>
            ) : (
              <button
                onClick={() => {
                  payPayment(setInvoice, order, token);
                }}
              >
                Төлбөр төлөх
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Order;
