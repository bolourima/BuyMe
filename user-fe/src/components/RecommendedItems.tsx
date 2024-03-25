import React from "react";
import { ProductCardOne } from "./ProductCardOne";
import { ProductType } from "@/types/productType";
export default function RecommendedItems({
  productData,
}: {
  productData: ProductType[];
}) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {productData.map((Data, i) => (
        <ProductCardOne data={Data} key={i} />
      ))}
    </div>
  );
}
