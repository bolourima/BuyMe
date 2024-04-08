import * as React from "react";
import ImageListItem from "@mui/material/ImageListItem";
import { ProductType } from "@/types/productType";
import { ClickHandler } from "@/types/handlerType";
import { LoveIcon } from "@/icon/LoveIcon";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { addToFavs } from "@/helper/addToFavs";
import { useContext, useEffect } from "react";
import { TokenContext } from "@/context/TokenContext";
import { toastifyWarning } from "@/utilities/toastify";

export const Masonry = ({
  data,
  setProductData,
}: {
  data: ProductType;
  setProductData: ClickHandler;
}) => {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
  const { _id, images = "", name, price = 0, disCount } = data || {};
  const { isSale = 0, salePercent = 0 } = disCount || {};
  const sale = (price * 100) / salePercent;
  const imgFirstFix = 0;
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toastifyWarning("Please signin");
      router.push("/signin");
      return;
    }
    setToken(accessToken);
  }, []);
  return (
    <ImageListItem className="rounded-lg border-2 border-gray-300">
      <Link as={`/productdetail/${_id}`} href={`/productdetail/[id]`}>
        <img src={images[imgFirstFix]} className="rounded-t-lg" />
      </Link>
      <div className="p-5 gap-1">
        <p className="text-xl">{name}</p>
        <p className="text-lg font-bold">{price.toLocaleString()}</p>
      </div>
      <div className="flex gap-2 justify-center items-center mb-4">
        <button
          onClick={() => addToFavs(_id, token)}
          className=" p-2 rounded-lg bg-black w-14 flex justify-center items-center h-8"
        >
          <LoveIcon />
        </button>
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
