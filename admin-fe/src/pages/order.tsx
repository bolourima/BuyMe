import { Orders } from "@/components/Orders";
import { productTypeForShop } from "@/types/orderType";
import { getOrders } from "@/utilities/getOrders";
import { useEffect, useState } from "react";

const Order = () => {
  const [orderData, setOrderData] = useState<productTypeForShop[]>([]);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    getOrders(accessToken, setOrderData);
  }, []);
  return (
    <div>
      <Orders orderData={orderData} />
    </div>
  );
};

export default Order;
