import { ProductType } from "@/types/productType";
import { DotSvg } from "../../icon/DotSvg";
import { HeartSvg } from "../../icon/HeartSvg";
import { ReviewSvg } from "../../icon/ReviewSvg";
import { SoldSvg } from "../../icon/SoldSvg";
import { StarSvg } from "../../icon/StarSvg";
import React from "react";

export const PDPart1 = ({ data }: { data: ProductType }) => {
  const {
    _id,
    images,
    name,
    quantity,
    description,
    categoryId,
    price,
    disCount,
    brandName,
    productCode,
  } = data;
  const { isSale, salePercent } = disCount;
  const sale = (price * 100) / salePercent;

  return (
    <div>
      <div className="flex gap-4">
        {images.map((img) => {
          return <img className="w-[100px] h-[150px]" src={img} />;
        })}
      </div>{" "}
      <h1>{name}</h1>
      <p>
        {categoryId.name} {name} {brandName}
      </p>
      <span>{quantity}</span>
      <span>{salePercent}</span>
      <span>{price}</span>
      <span>{sale}</span>
      <span>{isSale}</span>
      <p>{description}</p>
      <p>{productCode}</p>
    </div>
  );
};
