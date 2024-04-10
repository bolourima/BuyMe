import React, { useState, useEffect, useContext } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Bar from "@/icon/Bar";
import CartIcon from "@/icon/CartIcon";
import { userInitial } from "@/types/userInitial";
import { toastifyWarning } from "@/utilities/toastify";
import { jwtDecode } from "jwt-decode";
import { refresh } from "@/utilities/refreshToken";
import { UserType } from "@/types/userType";
import { getUserInfo } from "@/utilities/getUserInfo";

import { useRouter } from "next/router";
import { LoveMb } from "@/icon/LoveMb";
import { MyCartIcon } from "@/icon";
import { CheckIcon } from "@/icon/CheckIcon";
import { TokenContext } from "@/context/TokenContext";

export const MobileBareTest = () => {
  const [user, setUser] = useState<UserType>(userInitial);
  const { token, setToken } = useContext(TokenContext);

  const getUser = (data: UserType) => {
    setUser(data);
  };
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      router.push("/signin");
      return toastifyWarning("Please sign in");
    }
    const exp = jwtDecode(accessToken).exp;
    if (!exp) return;
    if (exp < Date.now() / 1000) {
      refresh();
    }
    getUserInfo(accessToken, getUser);
    setToken(accessToken);
  }, []);
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
            <div className="flex flex-col items-start gap-3 ">
              <div
                className="flex  items-center w-full gap-2 "
                onClick={() => router.push("/myprofile")}
              >
                <div className="flex w-20 h-20 items-center ">
                  <img
                    className="rounded-full w-16 h-16 "
                    src={user.avatarImg}
                    alt=""
                  />
                </div>
                <h1 className=" font-semibold text-xl">{user.name}</h1>
              </div>

              <div className="  w-full border-y-2 py-9 flex flex-col gap-4">
                <div
                  onClick={() => router.push("/basket")}
                  className=" flex items-center gap-5 "
                >
                  <div className="  w-7  h-7">
                    <CartIcon />
                  </div>
                  <h1 className="  text-lg font-semibold ">Cart</h1>
                </div>
                <div
                  onClick={() => router.push("/favorites")}
                  className=" flex items-center gap-5 "
                >
                  <div className=" ml-1">
                    <LoveMb />
                  </div>
                  <h1 className="  text-lg font-semibold ">favorites</h1>
                </div>
                <div
                  onClick={() => router.push("/order")}
                  className=" flex items-center gap-5 "
                >
                  <div className="ml-2 ">
                    <CheckIcon />
                  </div>
                  <h1 className="  text-xl font-semibold ">order</h1>
                </div>
              </div>
              <h1
                className=" text-xl font-bold"
                onClick={() => router.push("/productlist")}
              >
                All products
              </h1>

              <div className=" flex flex-col items-start gap-3 pl-1 ">
                <h1
                  className=" text-lg font-semibold"
                  onClick={() => router.push("/productlist/clothing")}
                >
                  Clothing
                </h1>
                <h1
                  className=" text-lg font-semibold"
                  onClick={() => router.push("/productlist/electronics")}
                >
                  Electronics
                </h1>
                <h1
                  className=" text-lg font-semibold"
                  onClick={() => router.push("/productlist/books")}
                >
                  Books
                </h1>
              </div>
            </div>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
