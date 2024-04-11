import { TokenContext } from "@/context/TokenContext";
import { getFavProducts } from "@/helper/getFavProducts";
import { removeFromFavs } from "@/helper/removeFromBasket";
import DeleteIcon from "@/icon/DeleteIcon";
import { ProductType } from "@/types/productType";
import { toastifyWarning } from "@/utilities/toastify";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ClickHandler } from "@/types/handlerType";
import { putIntoBasket } from "@/utilities/putIntoBasket";
import { ProductsInFavContext } from "@/context/ProductsInFavContext";

const favorites = ({
  data,
  setProductData,
}: {
  data: ProductType;
  setProductData: ClickHandler;
}) => {
  const router = useRouter();
  const { token, setToken } = useContext(TokenContext);
  const { productsInFav, setProductsInFav } = useContext(ProductsInFavContext);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toastifyWarning("Please signin");
      router.push("/signin");
      return;
    }
    setToken(accessToken);
    getFavProducts(accessToken, setProductsInFav);
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      {productsInFav.length > 0 ? (
        productsInFav.toReversed().map((product, i) => {
          return (
            <div className="flex w-10/12 lg:w-full lg:h-[270px]">
              <div
                key={i}
                className="gap-2 w-[700px] lg:mx-auto border-2 items-center justify-center px-4 my-4 shadow-lg bg-[#FBFBFB] rounded-xl"
              >
                <button
                  onClick={() => {
                    removeFromFavs(
                      token,
                      product._id,
                      productsInFav,
                      setProductsInFav
                    );
                  }}
                  className="w-full rounded-lg flex justify-end items-center mt-1"
                >
                  <DeleteIcon />
                </button>
                <div className="flex">
                  <div className="w-1/4 lg:w-[150px] h-full flex justify-center items-center">
                    <img src={product?.images[0]} className="mb-6" />
                  </div>
                  <div className="w-3/4 pl-4 h-full items-center">
                    <div>
                      <p className="text-lg font-sans font-semibold">
                        {product?.name}
                      </p>
                      <div className="hidden lg:block">
                        <div className="flex gap-2 mt-3">
                          <p className="font-sans font-semibold">Description</p>
                          <p className="overflow-x-scroll h-24 border-y-2 border-y-gray-300 rounded-sm font-sans">
                            {product?.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-1">
                      {product?.disCount.isSale ? (
                        <div className="flex gap-2">
                          <p className="line-through text-xl font-sans text-red-700 ">
                            {product?.price.toLocaleString()} ₮
                          </p>
                          <p className="text-xl font-sans text-green-500">
                            {(
                              product.price *
                              ((100 - product.disCount.salePercent) / 100)
                            ).toLocaleString()}
                            ₮
                          </p>
                        </div>
                      ) : (
                        <p className="text-xl font-sans text-green-500">
                          {product?.price.toLocaleString()} ₮
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => {
                          putIntoBasket(product, token);
                        }}
                        className="bg-black hover:bg-gray-400 text-white hover:text-black h-7 rounded-lg px-2 text-center text-sm font-semibold hover:font-bold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="w-full h-full flex items-center justify-center mt-64 text-2xl font-semibold">
          Your favorites is empty
        </p>
      )}
    </div>
  );
};

export default favorites;
