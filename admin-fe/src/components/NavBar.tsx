import React from "react";
import { IconBell } from "@/svg/IconBell";
import { IconPinecon } from "@/svg/IconPinecon";
import { IconUser } from "@/svg/IconUser";
import Link from "next/link";

export const NavBar = () => {
  return (
    <div className="flex bg-black py-1 px-6 justify-between h-12 items-center">
      <Link href={"/"}>
        <div>
          <IconPinecon />
        </div>
      </Link>
      <div className="flex items-center gap-5">
        <Link href={"/"}>
          <div>
            <IconBell />
          </div>
        </Link>

        <Link href={"/signin"}>
          <div className="flex gap-4 items-center">
            <IconUser />

            <button className="text-white">Username</button>
          </div>
        </Link>
      </div>
    </div>
  );
};
