import React from "react";
import { ProductCardOne } from "./ProductCardOne";
import { ProductType } from "@/types/productType";
export const RecommendedItems = ({
  ProductData,
}: {
  ProductData: ProductType[];
}) => {
  return (
    <div className=" w-full flex flex-col items-center gap-16">
      <h1 className=" font-extrabold text-6xl">Our Bestseller</h1>
      <div className=" w-10/12 flex place-content-between gap-12 ">
        {ProductData.map((Data, i) => (
          <ProductCardOne data={Data} key={i} />
        ))}
      </div>
    </div>
  );
};
