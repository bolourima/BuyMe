import CloseIcon from "@/icon/CloseIcon";
import React from "react";
import { ProfileSideBar } from "./ProfileSideBar";
import CartIcon from "@/icon/CartIcon";
import LocationIcon from "@/icon/LocationIcon";
import NotificationIcon from "@/icon/NotificationIcon";
import { SubCategory } from "./SubCategory";

export default function SideBar({ OpenBar }: { OpenBar: () => void }) {
  return (
    <div className="absolute top-0 w-full right-0 h-full z-10 bg-zinc-950/50">
      <div className="flex justify-between p-5 bg-white w-10/12 h-full">
        <div className=" w-full flex flex-col gap-6">
          <div className=" flex flex-col gap-2">
            <div className="flex w-20 h-20">
              <img className="rounded-full" src="./IconPicture.jpeg" alt="" />
            </div>
            <h1 className=" text-2xl font-semibold">User name her</h1>
          </div>

          <div className="  border-y-2 py-9 flex flex-col gap-4">
            <div className=" flex gap-5 shadow-sm">
              <div className=" w-7  h-7">
                <CartIcon />
              </div>
              <h1 className="  text-xl font-semibold ">My order</h1>
            </div>

            <div className=" flex gap-6 px-1 shadow-sm">
              <div className=" w-5  h-5">
                <LocationIcon />
              </div>
              <h1 className="  text-xl font-semibold ">Manage Addresses</h1>
            </div>
            <div className=" flex gap-5 px-1 shadow-sm">
              <div className=" w-6  h-6">
                <NotificationIcon />
              </div>
              <h1 className="  text-xl font-semibold ">Notification</h1>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h1 className=" text-xl font-bold">Categories</h1>

            <div className=" flex flex-col gap-3 pl-1 ">
              <h1 className=" text-lg font-semibold">Clothing</h1>
              <h1 className=" text-lg font-semibold">Electronics</h1>
              <h1 className=" text-lg font-semibold">Books</h1>
            </div>
          </div>
        </div>
        <div className="w-5" onClick={OpenBar}>
          <CloseIcon />
        </div>
      </div>
    </div>
  );
}
