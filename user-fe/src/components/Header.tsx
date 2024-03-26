import { BrandIcon } from "@/SVG/BrandIcon";
import { MsgIcon } from "@/SVG/MsgIcon";
import { MyCartIcon } from "@/SVG/MyCartIcon";
import { OrderIcon } from "@/SVG/OrderIcon";
import { ProfileIcon } from "@/SVG/ProfileIcon";
import { SearchIcon } from "@/SVG/SearchIcon";

import React from "react";

export const Header = () => {
  return (
    <div className="lg:flex justify-around">
      <div className=" flex items-center">
        <BrandIcon />
        <h1>Store</h1>
      </div>
      <div className=" flex lg:flex items-center rounded">
        <input type="search" placeholder="search" className="px-3 py-3 " />
        <select className=" lg:block select select-info px-2 max-w-xs w-48 ">
          <option disabled selected>
            All category
          </option>
          <option>Mobile accessory</option>
          <option>Electronics</option>
          <option>Smartphones </option>
          <option>Modern tech </option>
        </select>
        <button className="p-3 bg-cyan-500 text-white">Search</button>
      </div>
      <div className="flex items-center gap-5 ">
        <div className="flex flex-col items-center cursor-pointer hover:scale-105 duration-200 ease-out ">
          <ProfileIcon />
          <h1>Profile</h1>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105 duration-200 ease-out  ">
          <MsgIcon />
          <h1>Message</h1>
        </div>
        <div className="flex flex-col items-center  cursor-pointer hover:scale-105 duration-200 ease-out">
          <OrderIcon />
          <h1>Orders</h1>
        </div>
        <div className="flex flex-col items-center cursor-pointer hover:scale-105 duration-200 ease-out ">
          <MyCartIcon />
          <h1>My cart</h1>
        </div>
      </div>
    </div>
  );
};
