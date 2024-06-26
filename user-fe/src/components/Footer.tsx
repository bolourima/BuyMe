import { BrandIcon } from "@/icon/BrandIcon";
import { EmailIcon } from "@/icon/EmailIcon";
import { FaceIcon } from "@/icon/FaceIcon";
import { InstIcon } from "@/icon/InstIcon";
import { LinkitIcon } from "@/icon/LinkitIcon";
import { TwiterIcon } from "@/icon/TwiterIcon";
import { YoutubeIcon } from "@/icon/YoutubeIcon";
import Link from "next/link";

import React from "react";

export const Footer = () => {
  return (
    <div className=" w-ful bg-black text-white flex  justify-center py-20 mt-9">
      <div className=" flex w-10/12 flex-col items-center gap-6">
        <div className=" border-l-2 pl-2">
          <Link href={"/"}>
            <h1 className=" font-extrabold text-6xl ">Buy</h1>
            <h1 className=" content-center font-semibold text-2xl">me</h1>
          </Link>
        </div>
        <div className=" flex gap-3">
          <InstIcon />
          <FaceIcon />
          <TwiterIcon />
          <YoutubeIcon />
          
        </div>
        <div>
          <h1>© 2023 BuyMe </h1>
        </div>
      </div>
    </div>
  );
};
