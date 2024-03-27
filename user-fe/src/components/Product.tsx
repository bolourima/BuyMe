import React, { use, useContext, useState } from "react";
import { ProductCardTwo } from "./ProductCardTwo";
import { ProductCardThree } from "./ProductCardThree";
import { ProductType } from "../types/productType";
import AppIcon from "@/icon/AppIcon";
import ListIcon from "@/icon/ListIcon";
import { BasketVisiblityContext } from "@/context/BasketVisiblity";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { Basket } from "./Basket";
import { ClickHandler } from "@/types/handlerType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
export default function Product({
  productData,
}: {
  productData: ProductType[];
}) {
  const isList: boolean = true;

  return (
    <div className="">
      <div className={`${isList ? "hidden" : "block"}`}>
        {productData.map((Data, i) => (
          <ProductCardThree
            key={i}
            data={Data}
            setProductData={setProductData}
          />
        ))}
      </div>
      <div
        className={`${isList ? "block" : "hidden"} grid grid-cols-3 lg:gap-y-5`}
      >
        {productData.slice(renderedDataindex, maxDatasToShow).map((Data, i) => (
          <ProductCardTwo key={i} data={Data} setProductData={setProductData} />
        ))}
      </div>
    </div>
  );
}
