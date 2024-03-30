import DelletIcon from "@/icon/DelletIcon";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { changeProductQuantity } from "@/utilities/countChange";
import { createOrder } from "@/utilities/createOrder";
import { removeFromBasket } from "@/utilities/removeFromBasket";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { instance } from "@/instance";
import { jwtDecode } from "jwt-decode";
import { getBasketById } from "@/utilities/getBasketOfUser";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { BasketType } from "@/types/basketType";
const Basket = () => {
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState<string>("");
  const setBasket = async (token: string) => {
    const basketData: ProductTypeWithQuantity[] = await getBasketById(token);
    setProductsInBasket(basketData);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    setBasket(accessToken);
    setToken(accessToken);
  }, []);
  const countTotal = useMemo(async () => {
    setTotal(
      productsInBasket.reduce(
        (acc, cur) =>
          acc +
          cur.selectedProductQuantity *
            (cur.product.price *
              ((100 - cur.product.disCount?.salePercent) / 100)),
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
              <img
                src={product.product.images && product.product.images[0]}
                className="w-1/2 h-full"
              />
              <div className="flex flex-col w-1/2 pl-4 h-full">
                <p>Name: {product.product.name}</p>
                <p>Category: {product.product.categoryId?.name}</p>
                <p>SubCategory: {product.product.subCategoryName}</p>
                <p>Brand: {product.product.brandName}</p>
                <div>
                  Price:{" "}
                  {product.product.disCount?.isSale ? (
                    <p>
                      <p className="line-through">
                        {product.product.price.toLocaleString()}
                      </p>
                      {(
                        product.product.price *
                        ((100 - product.product.disCount.salePercent) / 100)
                      ).toLocaleString()}
                      ₮
                    </p>
                  ) : (
                    product.product.price?.toLocaleString()
                  )}
                </div>
                <p>
                  Discount:
                  {product.product.disCount?.isSale
                    ? "   " + product.product.disCount.salePercent + "%"
                    : "   Хямдралгүй"}
                </p>
                <p>Tags: {product.product.tag}</p>
                <div className="w-full h-fit justify-between flex my-4">
                  <button
                    onClick={() => {
                      if (product.selectedProductQuantity == 1) {
                        removeFromBasket(
                          product.product._id,
                          productsInBasket,
                          setProductsInBasket,
                          token
                        );
                      } else {
                        changeProductQuantity(
                          product,
                          false,
                          productsInBasket,
                          setProductsInBasket,
                          token
                        );
                      }
                    }}
                    className="w-1/6 h-12 rounded-lg bg-black text-white flex justify-center items-center"
                  >
                    -
                  </button>
                  <p className="h-15 w-fit flex justify-center items-center">
                    {product.selectedProductQuantity}
                  </p>
                  <button
                    className="w-1/6 h-12 rounded-lg bg-black text-white flex justify-center items-center cursor-pointer"
                    onClick={() => {
                      changeProductQuantity(
                        product,
                        true,
                        productsInBasket,
                        setProductsInBasket,
                        token
                      );
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    removeFromBasket(
                      product.product._id,
                      productsInBasket,
                      setProductsInBasket,
                      token
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
