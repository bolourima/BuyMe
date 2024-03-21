import React from "react";
import { ProductCardOne } from "./ProductCardOne";
type typeofItems = {};
export default function RecommendedItems() {
  const Datas: typeofItems = {};

  return (
    <div>
      {Datas.map((data, index) => (
        <ProductCardOne Data={data} index={index} />
      ))}
    </div>
  );
}
