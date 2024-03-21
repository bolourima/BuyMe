import React from "react";
import { ProductCardTwo } from "./ProductCardTwo";
import { ProductCardThree } from "./ProductCardThree";

type typeofItems = {};

export default function Product() {
  const mockData: typeofItems = {};
  return (
    <div>
      <div className={`${isList ? "hidden" : "block"}`}>
        {filteredDatas.map((mockData, index) => (
          <ProductCardTwo Data={mockData} index={index} />
        ))}
      </div>
      <div className={`${isList ? "block" : "hidden"}`}>
        {filteredDatas.map((mockData, index) => (
          <ProductCardThree Data={mockData} index={index} />
        ))}
      </div>
    </div>
  );
}
