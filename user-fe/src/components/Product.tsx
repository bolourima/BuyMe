import React, { use, useState } from "react";
import { ProductCardTwo } from "./ProductCardTwo";
import { ProductCardThree } from "./ProductCardThree";
import { ProductType } from "@/types/productType";
import { ProductFilterRecent } from "./ProductFilterRecent";
import { RelatedProductCard } from "./RelatedProductCard";
import AppIcon from "@/SVG/AppIcon";
import ListIcon from "@/SVG/ListIcon";

export default function Product({
  productData,
}: {
  productData: ProductType[];
}) {
  const [isList, setIsList] = useState(true);
  const handleIsList = () => {
    setIsList(!isList);
  };
  const maxDatasToShow = 5;
  const [renderedDataindex, setDataIndex] = useState(0);
  const handleChangeBundling = () =>
    setDataIndex(renderedDataindex + maxDatasToShow); //test frot changing product pages
  return (
    <div className="container">
      <div className="flex py-4">
        <button
          onClick={handleIsList}
          className={`${isList ? "hidden" : "block"}`}
        >
          <AppIcon />
        </button>
        <button
          onClick={handleIsList}
          className={`${isList ? "block" : "hidden"}`}
        >
          <ListIcon />
        </button>
        <button onChange={handleChangeBundling}>next page</button>
      </div>
      <div className={`${isList ? "hidden" : "block"}`}>
        {productData.slice(renderedDataindex, maxDatasToShow).map((Data, i) => (
          <ProductCardThree key={i} data={Data} />
        ))}
      </div>
      <div
        className={`${
          isList ? "block" : "hidden"
        } grid grid-cols-3 grid-rows-3 lg:gap-y-5`}
      >
        {productData.slice(renderedDataindex, maxDatasToShow).map((Data, i) => (
          <ProductCardTwo key={i} data={Data} />
        ))}
      </div>
    </div>
  );
}
