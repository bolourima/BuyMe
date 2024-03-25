import DelletIcon from "@/SVG/DelletIcon";
import { BasketVisiblityContext } from "@/context/BasketVisiblity";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { createOrder } from "@/utilities/createOrder";
import { removeFromBasket } from "@/utilities/removeFromBasket";
import React, { useContext, useEffect, useState } from "react";

export const Basket = () => {
  const { isBasketVisible, setIsBasketVisible } = useContext(
    BasketVisiblityContext
  );
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    setToken(accessToken);
  }, []);
  return (
    <div className="absolute z-30 flex flex-col w-1/2 h-[1000px] bg-gray-300 items-end rounded-lg">
      <button
        onClick={() => setIsBasketVisible(false)}
        className="w-8 h-8 mt-4 mr-4"
      >
        <DelletIcon />
      </button>
      <div className="w-full h-full px-4 flex flex-col gap-8 text-black">
        {productsInBasket.map((product) => {
          return (
            <div className="flex gap-2 w-full h-1/5 items-center px-4">
              <img src={product.images[0]} className="w-1/2 h-full" />
              <div className="flex flex-col w-1/2 pl-4 h-full">
                <p>Name: {product.name}</p>
                <p>Category: {product.categoryId.name}</p>
                <p>SubCategory: {product.subCategoryName}</p>
                <p>Brand: {product.brandName}</p>
                <div>
                  Price:{" "}
                  {product.disCount.isSale ? (
                    <p>
                      <span className="line-through">
                        {product.price.toLocaleString()}
                      </span>{" "}
                      {(
                        product.price *
                        ((100 - product.disCount.salePercent) / 100)
                      ).toLocaleString()}
                      ₮
                    </p>
                  ) : (
                    product.price.toLocaleString()
                  )}
                </div>
                <p>
                  Discount:
                  {product.disCount.isSale
                    ? "   " + product.disCount.salePercent + "%"
                    : "   Хямдралгүй"}
                </p>
                <p>Tags: {product.tag}</p>
                <button
                  onClick={() =>
                    removeFromBasket(
                      product._id,
                      productsInBasket,
                      setProductsInBasket
                    )
                  }
                  className="w-full bg-black h-12 rounded-lg text-white flex justify-center items-center"
                >
                  Delete from basket
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <button
        onClick={() => createOrder(productsInBasket, token)}
        className="w-full h-16 rounded-lg bg-black text-white"
      >
        Create Order
      </button>
    </div>
  );
};
