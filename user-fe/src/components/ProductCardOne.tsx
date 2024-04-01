import { ProductType } from "@/types/productType";
import React from "react";

export const ProductCardOne = ({ data }: { data: ProductType }) => {
  const { images = "", price, name, brandName } = data || {};
  return (
    <div className=" Pcart w-2/5 p-4 border border-gray-300 rounded  drop-shadow hover:scale-105 duration-200 ease-out	cursor-pointer flex flex-col gap-5">
      <div className="w-full  flex justify-center">
        <img className=" rounded-lg h-[400px]" src={images[0]} alt="t-shirt" />
      </div>
      <div className="w-full">
        <h1 className=" font-bold text-2xl">{price}</h1>
        <div>
          <p className=" text-2xl">{brandName}</p>
          {name}
        </div>
      </div>
    </div>
  );
};
