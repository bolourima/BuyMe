import { LoveIcon } from "@/SVG/LoveIcon";
import { StarTestIcon } from "@/SVG/StarTestIcon";
import { ProductType } from "@/types/productType";

import React from "react";

export const ProductCardTwo = ({ data }: { data: ProductType }) => {
  const { images, name, price, disCount, brandName, productCode } = data;
  const { isSale, salePercent } = disCount;
  const sale = (price * 100) / salePercent;

  return (
    <div className="bg-white border border-gray-300 rounded w-72 hover:scale-105 duration-200 ease-out	cursor-pointer">
      <div className=" p-9">
        <img src={images[0]} className="h-80 w-50" />
      </div>

      <div className="flex justify-between p-5 border-t-2 w-full  ">
        <div className=" flex flex-col gap-1">
          <div className="flex gap-2">
            <h1 className=" text-xl font-semibold">{price}</h1>
            <s
              className={`${
                isSale ? "block" : "hidden"
              } text-sm content-center`}
            >
              {sale}
            </s>
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
