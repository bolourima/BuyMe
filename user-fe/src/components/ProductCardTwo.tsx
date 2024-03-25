import { LoveIcon } from "@/SVG/LoveIcon";
import { StarTestIcon } from "@/SVG/StarTestIcon";
import { ProductType } from "@/types/productType";

import React from "react";

export const ProductCardTwo = ({ data }: { data: ProductType }) => {
  const {
    _id,
    images,
    name,
    price,
    disCount,
    brandName,
    productCode,
    categoryId,
  } = data;

  const { isSale, salePercent } = disCount;
  const sale = (price * 100) / salePercent;

  return (
    <div className="bg-white hover:bg-gray-300 hover:border hover:border-gray-300 rounded w-11/12 hover:scale-105 duration-300 cursor-pointer">
      <div className="lg:px-9 lg:pt-4  text-center">
        <a href={`/productDetail${_id}`}>
          <img src={images[0]} className="h-80 w-10/12 m-auto" />
        </a>
        <button className=" font-bold text-slate-800 lg:p-4 hover:text-blue-700">
          Add to Cart
        </button>
      </div>

      <div className="lg:px-5  ">
        <div className=" flex flex-col gap-1">
          <div className="">
            <div className=" flex gap-2 items-center">
              <h1 className=" text-black font-bold">{name}</h1>
            </div>
            <h1 className=" text-gray-500">
              Category:{categoryId.name} <br />
              Brand:{brandName}
            </h1>
            <p>{productCode}</p>
            <h1 className=" text-xl font-semibold">{price}</h1>
            <s
              className={`${
                isSale ? "block" : "hidden"
              } text-sm content-center`}
            >
              {sale}
            </s>
          </div>
        </div>
      </div>
    </div>
  );
};
