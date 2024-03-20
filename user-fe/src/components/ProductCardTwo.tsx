import { LoveIcon } from "@/SVG/LoveIcon";
import { StarTestIcon } from "@/SVG/StarTestIcon";

import React from "react";

export const ProductCardTwo = ({
  img,
  rating,
  price,
  discount,
  title,
}: {
  img: string;
  rating?: string;
  price: string;
  discount?: string;
  title: string;
}) => {
  return (
    <div className="  border border-gray-300 rounded w-72 hover:scale-105 duration-200 ease-out	cursor-pointer">
      <div className=" p-9">
        <img src={img} />
      </div>

      <div className=" p-5 border-t-2 w-full flex ">
        <div className=" flex flex-col gap-1">
          <div className="flex gap-2">
            <h1 className=" text-xl font-semibold">{price}</h1>
            <s className=" text-sm content-center">{discount}</s>
          </div>
          <div className=" flex gap-2 items-center">
            <StarTestIcon />
            <h1 className=" text-orange-400 ">{rating}</h1>
          </div>
          <h1 className=" text-gray-500">{title}</h1>
        </div>
        <button className="btn bg-white">
          <LoveIcon />
        </button>
      </div>
    </div>
  );
};
