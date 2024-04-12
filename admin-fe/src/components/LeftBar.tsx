import React, { useEffect, useState } from "react";
import { Icon1 } from "@/svg/Icon1";
import { Icon2 } from "@/svg/Icon2";
import { Icon3 } from "@/svg/Icon3";
import { Icon4 } from "@/svg/Icon4";
import { Icon5 } from "@/svg/Icon5";
import Link from "next/link";
import { jwtDecode } from "jwt-decode";

export const LeftBar = () => {
  const [isSubAdmin, setIsSubAdmin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;
    const decoded: { subAdmin: boolean } = jwtDecode(token);
    setIsSubAdmin(decoded.subAdmin);
  }, []);
  return (
    <div className="flex flex-col gap-4 w-2/12 ">
      {isSubAdmin ? null : (
        <Link href={"/shop"}>
          <div className="flex items-center hover:bg-[#F7F7F8] ">
            <div className="flex w-14 h-10 justify-center items-center">
              <Icon1 />
            </div>
            <div>
              <p>Админууд</p>
            </div>
          </div>
        </Link>
      )}
      <Link href={"/order"} className="flex items-center hover:bg-[#F7F7F8]">
        <div className="flex w-14 h-10 justify-center items-center">
          <Icon2 />
        </div>
        <div>
          <p>Захиалга</p>
        </div>
      </Link>

      <Link href={"./income"}>
        <div className="flex items-center hover:bg-[#F7F7F8]">
          <div className="flex w-14 h-10 justify-center items-center">
            <Icon3 />
          </div>
          <div>
            <p>Орлого</p>
          </div>
        </div>
      </Link>
      <Link href={"/product"} className="flex items-center hover:bg-[#F7F7F8]">
        <div className="flex w-14 h-10 justify-center items-center">
          <Icon4 />
        </div>
        <div>
          <p>Бүтээгдэхүүн</p>
        </div>
      </Link>
    </div>
  );
};
