import React from "react";
import { ProductCardOne } from "./ProductCardOne";
type DataType = {
  name: string;
  description: string;
  price: number;
  productCode: number;
  quantity: number;
  tag: string;
  disCount: number;
  subCategoryName: string;
  brandName: string;
  img: string[];
  createdAt: string;
  updatedAt: string;
};
export default function RecommendedItems() {
  const Datas: DataType[] = [
    {
      name: "GT-2",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores libero sequi veniam quisquam incidunt consequuntur, sunt dolorum ex magnam molestias assumenda, voluptas corporis nesciunt dolore, saepe quam tenetur aliquid aliquam.",
      price: 150000,
      productCode: 152415215,
      quantity: 200,
      tag: "end yu bichih ve sda ",
      disCount: 10,
      subCategoryName: "hud sda",
      brandName: "sdasdasd",
      img: ["asdasdasdads"],
      createdAt: "1972-12-01",
      updatedAt: "1972-12-01",
    },
  ];

  return (
    <div>
      {Datas.map((data, index) => (
        <ProductCardOne Data={data} index={index} />
      ))}
    </div>
  );
}
