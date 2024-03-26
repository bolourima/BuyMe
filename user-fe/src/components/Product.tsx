import React from "react";
import { ProductCardTwo } from "./ProductCardTwo";
import { ProductCardThree } from "./ProductCardThree";
import { ProductType } from "../types/productType";
import { ProductFilterRecent } from "./ProductFilterRecent";
import { RelatedProductCard } from "./RelatedProductCard";

export default function Product({
  productData,
}: {
  productData: ProductType[];
}) {
  const isList: boolean = true;

  return (
    <div className="">
      {/* <div className={`${isList ? "hidden" : "block"}`}>
        {productData.map((Data, i) => (
          <ProductCardThree key={i} data={Data} />
        ))}
      </div>
      <div
        className={`${
          isList ? "block" : "hidden"
        } grid gap-4 grid-cols-3 grid-rows-3`}
      >
        {productData.map((Data, i) => (
          <ProductCardTwo key={i} data={Data} />
        ))}
      </div> */}
    </div>
  );
}
