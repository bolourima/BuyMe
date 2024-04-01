import Bar from "@/icon/Bar";

import { DownIcon } from "@/icon/DownIcon";

import { MyCartIcon } from "@/icon/MyCartIcon";
import { OrderIcon } from "@/icon/OrderIcon";
import { ProfileIcon } from "@/icon/ProfileIcon";
import { SearchIcon } from "@/icon/SearchIcon";
import { useRouter } from "next/router";

import Link from "next/link";

import React, { useState } from "react";
import { tree } from "next/dist/build/templates/app-page";
import CloseIcon from "@/icon/CloseIcon";

export const Header = () => {
  const router = useRouter();

  // ----------------------------------------------------

  //           SHOW INPUT

  const [showImput, setShowInput] = useState(false);

  const clickSearch = () => {
    if (showImput === true) {
      setShowInput(false);
    } else {
      setShowInput(true);
    }
  };

  //---------------------------------------------

  //----------------------------------------------

  //           MOBILE BURGER SHOW MENU

  const [showBar, setShowBar] = useState(false);

  const openBar = () => {
    if (showBar === true) {
      setShowBar(false);
    } else {
      setShowBar(true);
    }
  };

  return (
    <div className="  text-black dark:w-full lg:w-full flex justify-center py-4  bg-white lg:sticky top-0 z-50 shadow-sm">
      <div className=" SideBar  flex lg:flex items-center w-10/12 place-content-between  ">
        {showBar && (
          <div className=" absolute top-0 w-full right-0 h-full z-10  bg-zinc-950/50">
            <div className=" flex place-content-between p-5 bg-white w-10/12 h-full">
              <div>
                <h1 className=" text-black"> hello</h1>
              </div>
              <div className=" w-5" onClick={openBar}>
                <CloseIcon />
              </div>
            </div>{" "}
          </div>
        )}
        <div className=" block w-5 lg:hidden  " onClick={openBar}>
          <Bar />
        </div>
        <div>
          <Link href={"./"}>
            <div className="flex hover:shadow-sm">
              <h1 className=" font-extrabold text-4xl">Buy</h1>
              <h1 className=" content-center font-semibold text-2xl">me</h1>
            </div>
          </Link>
        </div>

        <div className=" hidden lg:flex gap-6 items-center">
          <h1 className=" font-semibold text-xl">Home</h1>
          <Link href={"./productList"}>
            <h1 className=" lg:content-center text-xl flex items-center gap-2 hover:border p-2 rounded-md ">
              Categories
              <DownIcon />
            </h1>
          </Link>
        </div>
        <div>
          <div className=" relative lg:flex gap-6 items-center">
            <div className=" hidden lg:flex gap-6 items-center">
              {showImput && (
                <input
                  type="search"
                  className="border p-2 rounded absolute right-40"
                />
              )}

              <div onClick={clickSearch}>
                <SearchIcon />
              </div>

              <OrderIcon />
              <Link href={"./basket"}>
                <MyCartIcon />
              </Link>
            </div>

            <div>
              <Link href={"./signin"}>
                <ProfileIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
