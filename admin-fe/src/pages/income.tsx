import React from "react";
import DownloadIcon from "@/icon/DownloadIcon";
import { IconMonthly } from "@/svg/IconMonthly";

export default function Income() {
  const data = [
    {
      orderNumber: "#123432",
      costumer: "Zoloosoko@gmail.com",
      price: "12,000₮",
      date: "2024-01-10",
    },
    {
      orderNumber: "#123432",
      costumer: "Zoloosoko@gmail.com",
      price: "12,000₮",
      date: "2024-01-10",
    },
    {
      orderNumber: "#123432",
      costumer: "Zoloosoko@gmail.com",
      price: "12,000₮",
      date: "2024-01-10",
    },
    {
      orderNumber: "#123432",
      costumer: "Zoloosoko@gmail.com",
      price: "12,000₮",
      date: "2024-01-10",
    },
    {
      orderNumber: "#123432",
      costumer: "Zoloosoko@gmail.com",
      price: "12,000₮",
      date: "2024-01-10",
    },
    {
      orderNumber: "#123432",
      costumer: "Zoloosoko@gmail.com",
      price: "12,000₮",
      date: "2024-01-10",
    },
    {
      orderNumber: "#123432",
      costumer: "Zoloosoko@gmail.com",
      price: "12,000₮",
      date: "2024-01-10",
    },
    {
      orderNumber: "#123432",
      costumer: "Zoloosoko@gmail.com",
      price: "12,000₮",
      date: "2024-01-10",
    },
  ];
  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-20">
          <div className="w-[222px]"></div>
          <div className="flex flex-col gap-3 bg-[#ECEDF0] w-full">
            <div className="flex flex-col bg-white w-[724px] h-[160px] rounded-lg  m-auto">
              <div className="flex  justify-between items-center   border-b-2 p-6">
                <div className="text-xl">
                  <p>Орлого</p>
                </div>
                <div className="flex w-[144px] h-[36px] gap-2 items-center rounded-lg justify-center bg-[#ECEDF0]">
                  <DownloadIcon />
                  <button>Хуулга татах</button>
                </div>
              </div>
              <div className="flex  justify-between items-center  h-[56px] px-6 pt-5">
                <div className="text-3xl">
                  <p>235,000₮</p>
                </div>
                <div className="flex gap-2 items-center justify-center ">
                  <button className="flex w-[94px] h-[36px] border-[#ECEDF0] border-[1px] bg-white text-black hover:bg-[#18BA51] rounded-lg hover:text-white text-sm justify-center items-center px-1 py-2">
                    Өнөөдөр
                  </button>
                  <button className="flex w-[82px] h-[36px] bg-white rounded-lg text-black border-[#ECEDF0] border-[1px] hover:bg-[#18BA51]  hover:text-white text-sm justify-center items-center px-1 py-2">
                    7 хоног
                  </button>
                  <div className="flex w-[132px] h-[36px] bg-white rounded-lg gap-2  items-center px-1 py-2 border-[#ECEDF0] border-[1px]  ">
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
            <table className="w-[724px] m-auto">
              <tr className=" bg-white border-b-[1px] text-xs h-[44px] rounded-lg">
                <th>Захиалгын ID дугаар</th>
                <th>Захиалагч</th>
                <th>Төлбөр</th>
                <th>Огноо</th>
              </tr>
              {data.map((order) => {
                return (
                  <tr className="text-xs bg-white h-[72px] text-[#121316] border-[#ECEDF0] border-[1px]">
                    <th>{order.orderNumber}</th>
                    <th>{order.costumer}</th>
                    <th>{order.price}</th>
                    <th>{order.date}</th>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
