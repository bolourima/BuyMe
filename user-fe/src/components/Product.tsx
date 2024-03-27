import React, { use, useContext, useState } from "react";
import { ProductCardTwo } from "./ProductCardTwo";
import { ProductCardThree } from "./ProductCardThree";
import { ProductType } from "../types/productType";
import AppIcon from "@/icon/AppIcon";
import ListIcon from "@/icon/ListIcon";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { ClickHandler } from "@/types/handlerType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
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
    setDataIndex(renderedDataindex + maxDatasToShow);
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const setProductData: ClickHandler = (product: ProductType) => {
    putIntoBasket(product, productsInBasket, setProductsInBasket);
  };
  return (
    <div className="bg-[#2F306A]">
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
