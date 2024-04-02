import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { ProductType } from "@/types/productType";
import { ClickHandler } from "@/types/handlerType";
import { LoveIcon } from "@/icon/LoveIcon";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";

export const Masonry = ({
  data,
  setProductData,
}: {
  data: ProductType;
  setProductData: ClickHandler;
}) => {
  const router = useRouter();
  const { _id, images = "", name, price = 0, disCount } = data || {};
  const { isSale = 0, salePercent = 0 } = disCount || {};
  const sale = (price * 100) / salePercent;
  const imgFirstFix = 0;
  return (
    <ImageListItem className="rounded-lg border-2 border-gray-300">
      <img
        onClick={() => router.push(`${_id}`)}
        src={images[imgFirstFix]}
        className="rounded-t-lg"
      />
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
            setProductData(data, false);
          }}
          onDoubleClick={() => setProductData(data, true)}
          className="bg-black text-white h-8 rounded-lg px-4 text-center text-sm font-semibold "
        >
          ADD TO CART
        </button>
      </div>
    </ImageListItem>
  );
};
