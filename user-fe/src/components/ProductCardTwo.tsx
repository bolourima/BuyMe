import { LoveIcon } from "@/SVG/LoveIcon";
import { StarTestIcon } from "@/SVG/StarTestIcon";

import React from "react";

export const ProductCardTwo = ({ data }: any) => {
  const { img, name, price, disCount, brandName, productCode } = data;
  return (
    <div className="bg-white border border-gray-300 rounded w-72 hover:scale-105 duration-200 ease-out	cursor-pointer">
      <div className=" p-9">
        <img src={img} />
      </div>

      <div className="flex justify-between p-5 border-t-2 w-full  ">
        <div className=" flex flex-col gap-1">
          <div className="flex gap-2">
            <h1 className=" text-xl font-semibold">{price}</h1>
            <s className=" text-sm content-center">{disCount}</s>
          </div>
          <div className=" flex gap-2 items-center">
            <StarTestIcon />
            <h1 className=" text-orange-400 ">{}</h1>
          </div>
          <h1 className=" text-gray-500">
            {name} {brandName}
          </h1>
          <p>{productCode}</p>
        </div>
        <button className="btn bg-white">
          <LoveIcon />
        </button>
      </div>
    </div>
  );
};
