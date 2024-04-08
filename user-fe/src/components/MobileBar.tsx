import React from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Bar from "@/icon/Bar";
import Link from "next/link";
import CartIcon from "@/icon/CartIcon";
import LocationIcon from "@/icon/LocationIcon";
import NotificationIcon from "@/icon/NotificationIcon";

export default function MobileBareTest() {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="w-7">
          <Bar />
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className=" w-full flex flex-col gap-6">
            <div className=" flex flex-col items-start gap-2">
              <div className="flex w-20 h-20">
                <img className="rounded-full" src="./IconPicture.jpeg" alt="" />
              </div>
              <h1 className=" text-2xl font-semibold">User name her</h1>
            </div>

            <div className="  border-y-2 py-9 flex flex-col gap-4">
              <Link href={"/basket"}>
                <div className=" flex items-center gap-5 ">
                  <div className=" w-7  h-7">
                    <CartIcon />
                  </div>
                  <h1 className="  text-xl font-semibold ">My order</h1>
                </div>
              </Link>

              <div className=" flex items-center gap-6 px-1 ">
                <div className=" w-5  h-5">
                  <LocationIcon />
                </div>
                <h1 className="  text-xl font-semibold ">Manage Addresses</h1>
              </div>
              <div className=" flex items-center gap-5 px-1 ">
                <div className=" w-6  h-6">
                  <NotificationIcon />
                </div>
                <h1 className="  text-xl font-semibold ">Notification</h1>
              </div>
            </div>

            <div className="flex flex-col items-start gap-3">
              <h1 className=" text-xl font-bold">Categories</h1>

              <div className=" flex flex-col items-start gap-3 pl-1 ">
                <h1 className=" text-lg font-semibold">Clothing</h1>
                <h1 className=" text-lg font-semibold">Electronics</h1>
                <h1 className=" text-lg font-semibold">Books</h1>
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
