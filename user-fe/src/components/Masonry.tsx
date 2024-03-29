import * as React from "react";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { ProductType } from "@/types/productType";
import { ClickHandler } from "@/types/handlerType";
import { LoveIcon } from "@/icon/LoveIcon";
import { OrderIcon } from "@/icon/OrderIcon";

export default function Masonry({
  data,
  setProductData,
}: {
  data: ProductType;
  setProductData: ClickHandler;
}) {
  const { _id, images, name, price, disCount } = data;
  const { isSale, salePercent } = disCount;
  const sale = (price * 100) / salePercent;
  const imgFirstFix = 0;
  return (
    <ImageListItem className="rounded-lg border-2 border-gray-300">
      <a href={`/productId/${_id}`}>
        <img src={images[imgFirstFix]} className="rounded-t-lg" />
      </a>

      <div className="p-5 gap-1">
        <p className="text-xl">{name}</p>
        <p className="text-lg font-bold">{price.toLocaleString()}</p>
      </div>
      <div className="flex gap-2 justify-center items-center mb-4">
        <div className=" p-2 rounded-lg bg-black w-14 flex justify-center items-center h-8">
          <LoveIcon />
        </div>
        <button
          onClick={() => {
            setProductData(data);
          }}
          className="bg-black text-white h-8 rounded-lg px-4 text-center text-sm font-semibold "
        >
          ADD TO CART
        </button>
      </div>
    </ImageListItem>
  );
}
