import React from "react";
import { AExpressIcon } from "@/icon/AExpressIcon";
import { MasterCardIcon } from "@/icon/MasterCardIcon";
import { PayPallIcon } from "@/icon/PayPallIcon";
import { VisaIcon } from "@/icon/VisaIcon";
import { ApplePayIcon } from "@/icon/ApplePayIcon";
import { ProductsInBasketContext } from "@/context/FoodsInBasket";
import { changeProductQuantity } from "@/utilities/countChange";
import { createOrder } from "@/utilities/createOrder";
import { removeFromBasket } from "@/utilities/removeFromBasket";
import { useContext, useEffect, useMemo, useState } from "react";
import { XIcon } from "@/icon/XIcon";

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
    <div className="w-full flex justify-center pt-16 min-h-screen">
      <div className="flex flex-col gap-6 w-[900px]">
        {productsInBasket.map((product) => {
          return (
            <div className="flex flex-col shadow-md w-[800px] border-gray-300 border-[1px] rounded-xl p-5 ">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-5">
                  <div className="flex rounded-md justify-center items-center w-[100px] h-[150px]">
                    <img className="flex " src={product.images[0]} alt="" />
                  </div>
                  <div className="name">
                    <p className="text-lg font-semibold">{product.name}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="flex flex-col justify-end text-lg">
                    {product.disCount.isSale ? (
                      <div>
                        <p className="line-through text-red-500">
                          {(
                            product.price * product.selectedQuantity
                          ).toLocaleString()}
                        </p>{" "}
                        <p className="text-green-500">
                          {(
                            product.price *
                            ((100 - product.disCount.salePercent) / 100) *
                            product.selectedQuantity
                          ).toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      (
                        product.price * product.selectedQuantity
                      ).toLocaleString()
                    )}
                  </div>
                  <div className="flex w-[123px] h-10 border-slate-500 border-[1px] justify-center rounded-md gap-5 items-center p-1">
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
                      className="text-2xl"
                    >
                      -
                    </button>
                    <p className="text-lg">{product.selectedQuantity}</p>
                    <button
                      onClick={() =>
                        changeProductQuantity(
                          product,
                          true,
                          productsInBasket,
                          setProductsInBasket
                        )
                      }
                      className="text-2xl"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex gap-2.5 text-[13px]">
                    <button
                      onClick={() =>
                        removeFromBasket(
                          product._id,
                          productsInBasket,
                          setProductsInBasket
                        )
                      }
                      className="flex text-base h-9 w-9 bg-black border-2 justify-center rounded-full gap-5 items-center"
                    >
                      <XIcon />
                    </button>
                  </div>
                </div>
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
