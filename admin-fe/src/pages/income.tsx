import React, { useEffect, useState } from "react";
import DownloadIcon from "@/icon/DownloadIcon";
import { IconMonthly } from "@/svg/IconMonthly";
import { getOrders } from "@/utilities/getOrders";
import { OrderType, productTypeForShop } from "@/types/orderType";
import { calculateTotal } from "@/helper/calculateTotal";
import { totalIncome } from "@/helper/totalIncome";

const Income = () => {
  const [orderData, setOrderData] = useState<productTypeForShop[]>([]);
  const [orderDataForAdmin, setOrderDataForAdmin] = useState<OrderType[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    getOrders(accessToken, setOrderData, setOrderDataForAdmin);
  }, []);
  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-20">
        <div className="w-[222px]"></div>
        <div className="flex flex-col gap-3 bg-[#ECEDF0] w-full">
          <div className="flex flex-col bg-white w-full h-[160px] rounded-lg m-auto">
            <div className="flex justify-between items-center border-b-2 p-6">
              <div className="text-xl">
                <p>Орлого</p>
              </div>
              <div className="flex w-[144px] h-[36px] gap-2 items-center rounded-lg justify-center bg-[#ECEDF0]">
                <DownloadIcon />
                <button>Хуулга татах</button>
              </div>
            </div>
            <div className="flex justify-between items-center h-[56px] px-6 pt-5">
              <div className="text-3xl">
                {orderData.length > 0 && (
                  <p>{calculateTotal(orderData).toLocaleString()}₮</p>
                )}
                {orderDataForAdmin.length > 0 && (
                  <p>{totalIncome(orderDataForAdmin).toLocaleString()}</p>
                )}
              </div>
              <div className="flex gap-2 items-center justify-center ">
                <button className="flex w-[94px] h-[36px] border-[#ECEDF0] border-[1px] bg-white text-black hover:bg-[#18BA51] rounded-lg hover:text-white text-sm justify-center items-center px-1 py-2">
                  Өнөөдөр
                </button>
                <button className="flex w-[82px] h-[36px] bg-white rounded-lg text-black border-[#ECEDF0] border-[1px] hover:bg-[#18BA51] hover:text-white text-sm justify-center items-center px-1 py-2">
                  7 хоног
                </button>
                <div className="flex w-[132px] h-[36px] bg-white rounded-lg gap-2 items-center px-1 py-2 border-[#ECEDF0] border-[1px]">
                  <IconMonthly />
                  <select className="w-[90px] ">
                    <option value="">Сараар</option>
                    <option value="">1 сараар</option>
                    <option value="">2 сараар</option>
                    <option value="">3 сараар</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <table className="w-full m-auto">
            <thead>
              <tr className="bg-white p-3 border-b-[1px] text-xs h-[44px] rounded-lg">
                <th>Захиалгын ID дугаар</th>
                <th>Захиалагч</th>
                <th>Төлбөр</th>
                <th>Огноо</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {orderDataForAdmin.length > 0
                ? orderDataForAdmin.map((order, i) => (
                    <tr
                      key={i}
                      className="text-xs border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td className="p-3 text-left">{order.orderNumber}</td>
                      <td className="p-3 text-left">{order.user.name}</td>
                      <td className="p-3 text-right">{order.total}</td>
                      <td className="p-3 text-right">
                        {order.createdAt?.toString()}
                      </td>
                    </tr>
                  ))
                : orderData.map((order, i) => {
                    return (
                      <tr
                        key={i}
                        className="text-xs border-b border-gray-200 hover:bg-gray-100"
                      >
                        <td className="p-3 text-left">
                          {order[0]?.orderNumber}
                        </td>
                        <td className="p-3 text-left">{order[0]?.user}</td>
                        <td className="p-3 text-right">{order[0]?.total}</td>
                        <td className="p-3 text-right">
                          {order[0]?.createdAt?.toString()}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Income;
