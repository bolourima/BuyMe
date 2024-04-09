import { Orders } from "@/components/Orders";
import { OrderType, productTypeForShop } from "@/types/orderType";
import { getOrders } from "@/utilities/getOrders";
import { useEffect, useState } from "react";

const Order = () => {
  const [orderData, setOrderData] = useState<productTypeForShop[]>([]);
  const [orderDataForAdmin, setOrderDataForAdmin] = useState<OrderType[]>([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    getOrders(accessToken, setOrderData, setOrderDataForAdmin);
  }, []);
  return (
    <div>
      <Orders orderData={orderData} orderDataForAdmin={orderDataForAdmin} />
    </div>
  );
};

export default Order;
