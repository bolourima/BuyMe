import React from "react";
import LeftArrowIcon from "@/icon/LeftArrowIcon";
import { AExpressIcon } from "@/icon/AExpressIcon";
import { MasterCardIcon } from "@/icon/MasterCardIcon";
import { PayPallIcon } from "@/icon/PayPallIcon";
import { VisaIcon } from "@/icon/VisaIcon";
import { ApplePayIcon } from "@/icon/ApplePayIcon";
import { ProductsInBasketContext } from "@/context/ProductsInCartContext";
import { changeProductQuantity } from "@/utilities/countChange";
import { createOrder } from "@/utilities/createOrder";
import { removeFromBasket } from "@/utilities/removeFromBasket";
import { useContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { refresh } from "@/utilities/refreshToken";

const Basket = () => {
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const [total, setTotal] = useState(0);
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;
    const exp = jwtDecode(accessToken).exp;
    if (!exp) return;
    if (exp < Date.now() / 1000) {
      refresh();
    }
    setToken(accessToken);
  }, []);
  const countTotal = useMemo(async () => {
    setTotal(
      productsInBasket.reduce(
        (acc, cur) =>
          acc +
          cur.selectedProductQuantity *
            (cur.product.price *
              ((100 - cur.product.disCount.salePercent) / 100)),
        0
      )
    );
  }, [productsInBasket]);
  return (
    <div className="w-full flex flex-col items-center pt-16 min-h-screen">
      <div className="flex gap-6">
        {productsInBasket.map((product) => {
          return (
            <div className="flex flex-col bg-white w-[800px] border-[#DEE2E7] border-[1px] rounded-md  p-5 ">
              <div className="flex justify-between w-full py-5 border-b-2">
                <div className="flex gap-2">
                  <div className="flex w-20 h-20 bg-[#F7F7F7] rounded-md justify-center items-center">
                    <img
                      className="flex  w-[53px] h-[60px]"
                      src={product.product.images[0]}
                      alt=""
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className="text-[#1C1C1C]">{product.product.name}</p>
                    </div>
                    <div className="text-[#8B96A5]">
                      <p>Brand: {product.product.brandName}</p>
                    </div>
                    <div className="flex gap-2.5 text-[13px]">
                      <button className="flex w-[70px] h-[30px] px-[10px] text-black border-[#DEE2E7] border-[1px] rounded-md justify-center items-center">
                        Remove
                      </button>
                    </div>
                  </div>
                  <div></div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-end text-lg">
                    Price:{" "}
                    {product.product.disCount.isSale ? (
                      <p>
                        <span className="line-through">
                          {product.product.price.toLocaleString()}
                        </span>{" "}
                        {(
                          product.product.price *
                          ((100 - product.product.disCount.salePercent) / 100)
                        ).toLocaleString()}
                        ₮
                      </p>
                    ) : (
                      product.product.price.toLocaleString()
                    )}
                    <p>
                      Discount:
                      {product.product.disCount.isSale
                        ? "   " + product.product.disCount.salePercent + "%"
                        : "   Хямдралгүй"}
                    </p>
                  </div>
                  <div className="flex w-[123px] h-10 border-black border-[1px] justify-center rounded-md gap-5 items-center p-1">
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
                      className="text-2xl"
                    >
                      -
                    </button>
                    <p className="text-lg">{product.selectedProductQuantity}</p>
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
                      className="text-2xl"
                    >
                      +
                    </button>
                  </div>
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

              <div className="flex pt-5">
                <div className="flex items-center justify-end w-full">
                  <button className="flex w-[115px] h-[40px] px-[16px] text-white bg-black border-[1px] rounded-md justify-center items-center">
                    Remove all
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="w-[400px]">
          <div className="flex flex-col border-[#DEE2E7] border-[1px] rounded-md p-5 gap-2 bg-white">
            <div className="flex justify-between border-b-[1px] pb-4">
              <div className="text-[#505050]">
                <p>Subtotal:</p>
                <p>Discount:</p>
                <p>Tax:</p>
              </div>
              <div>
                <p>$1403.97</p>
                <p className="text-[#FA3434]">- $60.00</p>
                <p className="text-[#00B517]">+ $14.96</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="text-[#1C1C1C]">
                <p>Total:</p>
              </div>
              <div className="text-[20px]">
                <p>$1357.97</p>
              </div>
            </div>
            <div className="mt-4">
              <button
                onClick={() => createOrder(productsInBasket, token, total)}
                className="bg-black text-white w-full h-[54px] rounded-lg"
              >
                Create Order
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
      </div>
    </div>
  );
};
export default Basket;
