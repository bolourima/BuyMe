import DelletIcon from "@/icon/DelletIcon";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { changeProductQuantity } from "@/utilities/countChange";
import { createOrder } from "@/utilities/createOrder";
import { removeFromBasket } from "@/utilities/removeFromBasket";
import React, { useContext, useEffect, useMemo, useState } from "react";
const Basket = () => {
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    setToken(accessToken);
  }, []);
  const countTotal = useMemo(async () => {
    setTotal(
      productsInBasket.reduce(
        (acc, cur) =>
          acc +
          cur.selectedQuantity *
            (cur.price * ((100 - cur.disCount.salePercent) / 100)),
        0
      )
    );
  }, [productsInBasket]);
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-300 items-end rounded-lg">
      <div className="w-full h-full px-4 flex flex-col gap-8 text-black">
        {productsInBasket.map((product) => {
          return (
            <div className="flex gap-2 w-full h-[300px] items-center px-4 my-4">
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
                <div className="w-full h-fit justify-between flex my-4">
                  <button
                    onClick={() => {
                      if (product.selectedQuantity == 1) {
                        removeFromBasket(
                          product._id,
                          productsInBasket,
                          setProductsInBasket
                        );
                      } else {
                        changeProductQuantity(
                          product,
                          false,
                          productsInBasket,
                          setProductsInBasket
                        );
                      }
                    }}
                    className="w-1/6 h-12 rounded-lg bg-black text-white flex justify-center items-center"
                  >
                    -
                  </button>
                  <p className="h-15 w-fit flex justify-center items-center">
                    {product.selectedQuantity}
                  </p>
                  <button
                    onClick={() =>
                      changeProductQuantity(
                        product,
                        true,
                        productsInBasket,
                        setProductsInBasket
                      )
                    }
                    className="w-1/6 h-12 rounded-lg bg-black text-white flex justify-center items-center"
                  >
                    +
                  </button>
                </div>
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
        onClick={() => createOrder(productsInBasket, token, total)}
        className="w-full h-16 rounded-lg bg-black text-white"
      >
        Create Order
      </button>
    </div>
  );
};

export default Basket;
