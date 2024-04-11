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
    <div className="lg:px-32 grid grid-cols-1 lg:grid-cols-2 gap-7">
      {invoice.invoice_id && (
        <div className="lg:w-[600px] w-full h-full justify-center items-center lg:ml-[450px] absolute z-50">
          <Qr invoice={invoice} setInvoice={setInvoice} />
        </div>
      )}
      {orderData.toReversed().map((order) => {
        return (
          <div className="flex justify-center overflow-scroll lg:h-[400px] shadow-lg">
            <div className="border-2 rounded-lg w-full p-6 overflow-scroll ">
              <div className="flex justify-between mb-3 border-b-2 pb-2">
                <div className="flex gap-2">
                  <p className="font-sans font-semibold">Order number:</p>
                  <p>{order.orderNumber}</p>
                </div>
                <div className="flex gap-2">
                  <p className="font-sans font-semibold">Total price:</p>
                  <p className="font-sans text-green-500">
                    {order.total.toLocaleString()}₮
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-between items-center border-b-2 pb-2">
                <div className="flex gap-1 lg:gap-2 justify-center items-center">
                  <p className="font-sans font-semibold">Delivery status</p>
                  <p
                    className={`text-white w-24 h-8 p-1 rounded-2xl flex justify-center items-center ${
                      order.deliveryStatus === "PENDING" && "bg-blue-700"
                    } ${
                      order.deliveryStatus === "SHIPPED" && "bg-orange-700"
                    } ${
                      order.deliveryStatus === "DELIVERED" && "bg-green-700"
                    }  ${order.deliveryStatus === "CANCELED" && "bg-gray-500"}`}
                  >
                    {order.deliveryStatus}
                  </p>
                </div>
                <div className="flex gap-1 lg:gap-2 justify-center items-center">
                  <p className="font-sans font-semibold">Payment status</p>
                  {order.paymentStatus === "PAID" ? (
                    <div className="w-24 h-8 rounded-2xl bg-green-700 text-white flex justify-center items-center">
                      PAID
                    </div>
                  ) : (
                    <button
                      className="w-fit p-2 h-11 rounded-2xl hover:bg-orange-400 bg-orange-700 text-white flex justify-center items-center"
                      onClick={() => {
                        payPayment(setInvoice, order, token);
                      }}
                    >
                      PAYMENT PENDING
                    </button>
                  )}
                </div>
              </div>
              <div className="flex justify-center">
                <p className="my-4 font-semibold">ORDERED PRODUCTS</p>
              </div>
              <div className="gap-4 grid grid-cols-2">
                {order.products.map((productWithQuantity) => {
                  return (
                    <div className="flex-col items-center justify-center p-2">
                      <div className="w-full flex justify-center items-center">
                        <img
                          src={productWithQuantity.product.images[0]}
                          alt=""
                          className="h-[190px] rounded-md mb-2"
                        />
                      </div>
                      <div className="flex gap-2 border-b-2">
                        <p className="font-sans font-semibold">Product name:</p>
                        <p>{productWithQuantity.product.name}</p>
                      </div>
                      <div className="flex gap-2 items-center border-b-2">
                        <p className="font-sans font-semibold">
                          Selected quantity:
                        </p>
                        <p>{productWithQuantity.selectedProductQuantity}</p>
                      </div>
                      <div className="flex gap-2">
                        <p className="font-sans font-semibold">Address info:</p>
                        <p>
                          {order.address?.addressName}, {order.address?.city},{" "}
                          {order.address?.district}, {order.address?.khoroo},{" "}
                          {order.address?.building}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div></div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
