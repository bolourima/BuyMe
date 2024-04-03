import Bar from "@/icon/Bar";

import {
  DownIcon,
  MyCartIcon,
  OrderIcon,
  ProfileIcon,
  SearchIcon,
} from "@/icon";

import { useRouter } from "next/router";

import Link from "next/link";

import React, { useContext, useEffect, useState } from "react";
import { tree } from "next/dist/build/templates/app-page";
import CloseIcon from "@/icon/CloseIcon";
import SideBar from "./SideBar";
import { TokenContext } from "@/context/TokenContext";
import { toastifyWarning } from "@/utilities/toastify";
import { jwtDecode } from "jwt-decode";
import { refresh } from "@/utilities/refreshToken";

export const Header = () => {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);

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
    setShowBar(!showBar);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    const exp = jwtDecode(accessToken).exp;
    if (!exp) return;
    if (exp < Date.now() / 1000) refresh();
    setToken(accessToken);
  }, []);
  return (
    <div className="  text-black dark:w-full lg:w-full flex justify-center py-4  bg-white lg:sticky top-0 z-50 shadow-sm">
      <div className=" SideBar  flex lg:flex items-center w-10/12 place-content-between  ">
        <div className=" block w-5 lg:hidden" onClick={openBar}>
          <Bar />
        </div>
        <SideBar openBar={openBar} showBar={showBar} />

        <div>
          <Link href={"/"}>
            <div className="flex hover:shadow-sm">
              <h1 className=" font-extrabold text-4xl">Buy</h1>
              <h1 className=" content-center font-semibold text-2xl">me</h1>
            </div>
          </Link>
        </div>

        <div className=" hidden lg:flex w-10/12 justify-center  gap-6 items-center">
          <h1 className=" font-semibold text-xl">Home</h1>
          <Link href={"/productList"}>
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
              <button
                onClick={() => {
                  if (!token) toastifyWarning("Please sign in");
                  else router.push("/basket");
                }}
              >
                <MyCartIcon />
              </button>
            </div>

            <div>
              <button
                onClick={() => {
                  if (!token) {
                    toastifyWarning("Please sign in"), router.push("/signin");
                  } else router.push("/myprofile");
                }}
              >
                <ProfileIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
