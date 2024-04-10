import ImageListItem from "@mui/material/ImageListItem";
import { ProductType } from "@/types/productType";
import { ClickHandler } from "@/types/handlerType";
import { LoveIcon } from "@/icon/LoveIcon";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import { addToFavs } from "@/helper/addToFavs";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "@/context/TokenContext";
import { toastifyWarning } from "@/utilities/toastify";
import { removeFromFavs } from "@/helper/removeFromBasket";
import { RedLoveIcon } from "@/icon/RedLoveIcon";

export const Masonry = ({
  data,
  setProductData,
  isFav,
}: {
  data: ProductType;
  setProductData: ClickHandler;
  isFav: boolean;
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
    <ImageListItem className="rounded-lg border-2 border-gray-300 w-[320px] sm:w-[180px] lg:w-[240px] md:w-[200px]">
      <Link as={`/productdetail/${_id}`} href={`/productdetail/[id]`}>
        <img src={images[imgFirstFix]} className="rounded-t-lg" />
      </Link>
      <div className="p-5 gap-1">
        <p className="text-lg">{name}</p>
        <p className="text-lg font-bold">{price.toLocaleString()}</p>
      </div>
      <div className="flex gap-2 justify-center items-center mb-4">
        <button
          onClick={() => {
            if (!isFav) {
              return addToFavs(_id, token);
            }
            removeFromFavs(token, _id);
          }}
          className={`p-1 lg:p-2 rounded-lg ${
            isFav
              ? "bg-white border-[1px] border-solid border-red-800"
              : "bg-black hover:bg-gray-400 bbtn"
          } w-11  flex justify-center items-center h-7`}
        >
          {isFav ? (
            <div className="w-4 h-4">
              <RedLoveIcon />
            </div>
          ) : (
            <LoveIcon />
          )}
        </button>
        <button
          onClick={() => {
            setProductData(data, false);
          }}
          onDoubleClick={() => setProductData(data, true)}
          className="bg-black text-white h-7 rounded-lg px-2 text-center text-sm font-semibold hover:bg-gray-400 hover:font-bold hover:text-black "
        >
          ADD TO CART
        </button>
      </div>
    </ImageListItem>
  );
};
