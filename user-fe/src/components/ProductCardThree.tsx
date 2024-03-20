import { LoveIcon } from "@/SVG/LoveIcon";
import { StarTestIcon } from "@/SVG/StarTestIcon";
import { title } from "process";

import React from "react";

export const ProductCardThree = ({
  img,
  price,
  title,
  discount,
  rating,
  order,
  description,
}: {
  img: string;
  price: string | number;
  discount?: string | number;
  title: string;
  rating?: string;
  order: string;
  description: string;
}) => {
  return (
    <div className="flex p-7 border w-fit gap-4 rounded-lg">
      <div>
        <img src={img} alt="img" />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className=" font-medium">{title}</h1>
        <div>
          <div className="flex gap-2">
            <h1>{price}</h1>
            <s>{discount}</s>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <StarTestIcon />
              <h1 className=" text-orange-400 ">{rating}</h1>
            </div>
            <div className=" border rounded-full bg-gray-300 w-2 h-2"></div>
            <h1 className=" text-[#8B96A5]">{order}</h1>
            <div className=" border rounded-full bg-gray-300 w-2 h-2"></div>
            <h1 className=" text-[#00B517]">Free Shipping</h1>
          </div>
        </div>
        <h1 className="">{description}</h1>
        <h1 className=" text-[#0D6EFD] cursor-pointer">View details</h1>
      </div>
      <div>
        <button className="btn bg-white">
          <LoveIcon />
        </button>
      </div>
    </div>
  );
};
