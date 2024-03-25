import { ProductType } from "@/types/productType";
import React from "react";

export const ProductCardOne = ({ data }: { data: ProductType }) => {
  const { images, price, name, brandName } = data;
  return (
    <div className=" p-4 border text-sm  border-gray-300 rounded w-20 drop-shadow hover:scale-105 duration-200 ease-out	cursor-pointer">
      <div className=" p-6">
        <img className={`w-auto`} src={images[0]} alt="t-shirt" />
      </div>
      <div className="">
        <h1>{price}</h1>
        <p>
          {brandName}
          {name}
        </p>
      </div>
    </div>
  );
};
