import React from "react";
import { ProductCardOne } from "./ProductCardOne";
import { ProductType } from "@/types/productType";
export default function RecommendedItems({
  ProductData,
}: {
  ProductData: ProductType[];
}) {
  return (
    <div className="grid grid-cols-5 gap-4">
      {ProductData.map((Data, i) => (
        <ProductCardOne data={Data} key={i} />
      ))}
    </div>
  );
}
