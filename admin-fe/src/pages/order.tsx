import DataTableOrder from "@/components/DataTableOrder";
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
      <DataTableOrder orderDataForAdmin={orderDataForAdmin} />
    </div>
  );
};

export default Order;
