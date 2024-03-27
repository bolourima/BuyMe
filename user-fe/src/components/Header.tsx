import Bar from "@/icon/Bar";
import { BrandIcon } from "@/icon/BrandIcon";
import { DownIcon } from "@/icon/DownIcon";
import { MsgIcon } from "@/icon/MsgIcon";
import { MyCartIcon } from "@/icon/MyCartIcon";
import { OrderIcon } from "@/icon/OrderIcon";
import { ProfileIcon } from "@/icon/ProfileIcon";
import { SearchIcon } from "@/icon/SearchIcon";

import Link from "next/link";

import React, { useState } from "react";

export const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);

  const showModelInput = () => {
    setOpenSearch(true);
  };
  return (
    <div className=" w-full lg:w-full flex justify-center py-4  bg-white sticky top-0 z-50">
      <div className=" flex lg:flex items-center w-10/12 place-content-between  ">
        <div className=" block w-5 lg:hidden  ">
          <Bar />
        </div>
        <div>
          <Link href={"./"}>
            <div className="flex">
              <h1 className=" font-extrabold text-4xl">Buy</h1>
              <h1 className=" content-center font-semibold text-2xl">me</h1>
            </div>
          </Link>
        </div>

        <div className=" hidden lg:flex gap-6">
          <h1 className=" font-semibold text-xl">Home</h1>
          <h1 className=" content-center text-xl flex items-center gap-2 ">
            Categories
            <DownIcon />
          </h1>
        </div>
        <div>
          <div className="lg:flex gap-6">
            <div className=" hidden lg:flex gap-6">
              <SearchIcon />
              <OrderIcon />
              <MyCartIcon />
            </div>

            <div>
              <ProfileIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
