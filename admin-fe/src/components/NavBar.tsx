import React from "react";
import { IconBell } from "@/svg/IconBell";
import { IconPinecon } from "@/svg/IconPinecon";
import { IconUser } from "@/svg/IconUser";

export const NavBar = () => {
  return (
    <div className="flex bg-black py-1 px-6 justify-between h-12 items-center">
      <div>
        <a href="">
          <IconPinecon />
        </a>
      </div>
      <div className="flex items-center gap-5">
        <div>
          <a href="">
            <IconBell />
          </a>
        </div>
        <div className="flex gap-4 items-center">
          <a href="">
            <IconUser />
          </a>
          <button className="text-white">Username</button>
        </div>
      </div>
    </div>
  );
};
