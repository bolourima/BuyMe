import { AExpressIcon } from "@/icon/AExpressIcon";
import { MasterCardIcon } from "@/icon/MasterCardIcon";
import { PayPallIcon } from "@/icon/PayPallIcon";
import { VisaIcon } from "@/icon/VisaIcon";
import { ApplePayIcon } from "@/icon/ApplePayIcon";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { changeProductQuantity } from "@/utilities/countChange";
import { createOrder } from "@/utilities/createOrder";
import { removeFromBasket } from "@/utilities/removeFromBasket";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { getBasketById } from "@/utilities/getBasketOfUser";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
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
            (cur.product?.price *
              ((100 - cur.product?.disCount.salePercent) / 100)),
        0
      )
    );
  }, [productsInBasket]);
  return (
    <div className="w-full flex justify-center pt-16 min-h-screen">
      <div className="flex flex-col gap-6 w-[900px]">
        {productsInBasket.length &&
          productsInBasket.map((product) => {
            console.log(product);
            return (
              <div className="flex gap-2 w-full h-[300px] items-center px-4 my-4">
                <img
                  src={product.product?.images[0]}
                  className="w-1/2 h-full"
                />
                <div className="flex flex-col w-1/2 pl-4 h-full">
                  <p>Name: {product.product?.name}</p>
                  <p>Category: {product.product?.categoryId.name}</p>
                  <p>SubCategory: {product.product?.subCategoryName}</p>
                  <p>Brand: {product.product?.brandName}</p>
                  <div>
                    Price:{" "}
                    {product.product?.disCount.isSale ? (
                      <p>
                        <p className="line-through">
                          {product.product?.price.toLocaleString()}
                        </p>{" "}
                        {(
                          product.product.price *
                          ((100 - product.product.disCount.salePercent) / 100)
                        ).toLocaleString()}
                        ₮
                      </p>
                    ) : (
                      product.product?.price.toLocaleString()
                    )}
                  </div>
                  <p>
                    Discount:
                    {product.product?.disCount.isSale
                      ? "   " + product.product?.disCount.salePercent + "%"
                      : "   Хямдралгүй"}
                  </p>
                  <p>Tags: {product.product?.tag}</p>
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
                      onClick={() =>
                        changeProductQuantity(
                          product,
                          true,
                          productsInBasket,
                          setProductsInBasket,
                          token
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
                        product.product?._id,
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
      {productsInBasket.length > 0 && (
        <div className="w-[400px] ">
          <div className="flex flex-col border-[#DEE2E7] border-[1px] rounded-md p-5 gap-2 bg-white shadow-md">
            <div className="flex justify-center border-b-[1px] pb-4 text-xl font-sans font-semibold">
              {" "}
              PAYMENT DETAIL
            </div>
            <div className="flex justify-between my-4">
              <div className="text-[#1C1C1C]">
                <p className="text-xl">Total:</p>
              </div>
              <div className="text-[20px] ">
                <p className="font-semibold">{total.toLocaleString()}</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => createOrder(productsInBasket, token, total)}
                className="bg-black text-white w-full h-[54px] rounded-lg"
              >
                Pay
              </button>
            </div>
            <div className="flex justify-around mt-5">
              <AExpressIcon />
              <MasterCardIcon />
              <PayPallIcon />
              <VisaIcon />
              <ApplePayIcon />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Basket;
