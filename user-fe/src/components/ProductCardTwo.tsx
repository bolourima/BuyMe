import { LoveIcon } from "@/icon/LoveIcon";
import { StarTestIcon } from "@/icon/StarTestIcon";
import { BasketVisiblityContext } from "@/context/BasketVisiblity";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { ProductType } from "@/types/productType";

import React, { useContext } from "react";
import { Basket } from "./Basket";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import { ClickHandler } from "@/types/handlerType";

export const ProductCardTwo = ({
  data,
  setProductData,
}: {
  data: ProductType;
  setProductData: ClickHandler;
}) => {
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
  const imgFirstFix = 0;

  return (
    <div className=" bg-[#2F306A] hover:bg-slate-500 border border-slate-700 hover:border-gray-300 text-white rounded w-11/12 hover:scale-105 duration-300 cursor-pointer">
      <div className="lg:px-9 lg:pt-4  text-center">
        <a href={`/productdetail?${_id}`}>
          <img src={images[imgFirstFix]} className="h-80 w-10/12 m-auto" />
        </a>
      </div>
      <div className="lg:px-5  ">
        <div className=" flex flex-col gap-1 text-center">
          <h1 className="  font-bold">{name}</h1>
          <h1 className="">
            Category:{categoryId.name} <br />
            Brand:{brandName}
          </h1>
          <p>{productCode}</p>
          <h1 className=" text-xl font-semibold">{price}</h1>
          <s
            className={`${isSale ? "block" : "hidden"} text-sm content-center`}
          >
            {sale}
          </s>

          <button
            onClick={() => {
              setProductData(data);
            }}
            className=" font-bold border rounded-lg lg:p-4 hover:text-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
