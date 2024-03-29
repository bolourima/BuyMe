import React from "react";
import { HandIcon } from "@/icon/HandIcon";
import { UserIcon } from "@/icon/UserIcon";
import CartIcon from "@/icon/CartIcon";
import LocationIcon from "@/icon/LocationIcon";
import NotificationIcon from "@/icon/NotificationIcon";

export const ProfileSideBar = () => {
  return (
    <div className=" border-gray-200 lg:border-gray-200 border-[1px]">
      <div className="flex gap-5 items-center p-5">
        <div className="flex w-12 h-12">
          <img className="rounded-full" src="./IconPicture.jpeg" alt="" />
        </div>
        <div className="">
          <div className="flex gap-3">
            <div>
              <p>Hello</p>
            </div>
            <div className="w-5 h-5">
              <HandIcon />
            </div>
          </div>
          <div className="text-xl">
            <p>Elizabeth Warren</p>
          </div>
        </div>
      </div>
      <div className="">
        <button className="bttn flex gap-4 bg-white text-black w-full h-[50px] items-center hover:bg-black hover:text-white">
          <div className="w-5 h-5 mx-4">
            <UserIcon />
          </div>

          <p>Personal Information</p>
        </button>
        <button className="bttn flex gap-4 bg-white text-black w-full h-[50px] items-center hover:bg-black hover:text-white">
          <div className="w-5 h-5 mx-4">
            <CartIcon />
          </div>
          <p>My Orders</p>
        </button>
        <button className="bttn flex gap-4 bg-white text-black w-full h-[50px] items-center hover:bg-black hover:text-white">
          <div className="w-5 h-5 mx-4">
            <LocationIcon />
          </div>
          <p>Manage Addresses</p>
        </button>
        <button className="bttn flex gap-4 bg-white text-black w-full h-[50px] items-center hover:bg-black hover:text-white">
          <div className="w-5 h-5 mx-4">
            <NotificationIcon />
          </div>
          <p>Notifications</p>
        </button>
      </div>
    </div>
  );
};