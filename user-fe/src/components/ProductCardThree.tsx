import { LoveIcon } from "@/SVG/LoveIcon";
import { StarTestIcon } from "@/SVG/StarTestIcon";
import { ProductType } from "@/types/productType";
import { title } from "process";

import React from "react";

export const ProductCardThree = ({ data }: { data: ProductType }) => {
  console.log(data);
  const {
    _id,
    images,
    name,
    quantity,
    description,
    price,
    disCount,
    brandName,
    productCode,
  } = data;
  const { isSale, salePercent } = disCount;
  const sale = (price * 100) / salePercent;
  return (
    <div className="flex bg-[#FFFFFF] mt-3 p-7 border w-fit gap-4 rounded-lg">
      <div className="">
        <img className="lg:w-96" src={images[0]} alt="img" />
      </div>
      <div className="flex flex-col gap-4">
        <h1 className=" font-medium">
          {name} {brandName}
        </h1>
        <div>
          <div className="flex gap-2">
            <h1>{price}</h1>
            <h1 className={`${isSale ? "hidden" : "block"}`}>{sale}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <StarTestIcon />
              <h1 className=" text-orange-400 ">{productCode}</h1>
              <h1 className="  ">{}</h1>
            </div>
            <div className=" border rounded-full bg-gray-300 w-2 h-2"></div>
            <h1 className=" text-[#8B96A5]">{quantity}</h1>
            <div className=" border rounded-full bg-gray-300 w-2 h-2"></div>
            <h1 className=" text-[#00B517]">Free Shipping</h1>
          </div>
        </div>
        <div className="">
          <p className="">{description}</p>
          <span className=" text-[#0D6EFD] cursor-pointer underline hover:no-underline p-2 pl-0">
            View details
          </span>
        </div>
      </div>
      <div>
        <button className="btn bg-white">
          <LoveIcon />
        </button>
      </div>
    </div>
  );
};
