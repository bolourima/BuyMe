import { ProductsInBasketContext } from "@/context/ProductsInCartContext";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { getBasketById } from "@/utilities/getBasketOfUser";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { TokenContext } from "@/context/TokenContext";
import { useRouter } from "next/router";
import { toastifyWarning } from "@/utilities/toastify";
import { Qr } from "@/components/Qr";
import { PaymentSection } from "@/components/PaymentSection";
import { ProductSectionOfBasket } from "@/components/ProductSectionOfBasket";
const Basket = () => {
  const router = useRouter();
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const [qrcode, setQrcode] = useState("");
  let total: number = 0;
  const { token, setToken } = useContext(TokenContext);
  const setBasket = async (accessToken: string) => {
    const basketData: ProductTypeWithQuantity[] = await getBasketById(
      accessToken
    );
    setProductsInBasket(basketData);
  };
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const paymentToken = localStorage.getItem("paymentToken");
    if (!accessToken) {
      router.push("/signin");
      return toastifyWarning("Please sign in");
    }
    setToken(accessToken);
    setBasket(accessToken);
  }, []);
  total = useMemo(() => {
    return productsInBasket.reduce(
      (acc, cur) =>
        acc +
        cur.selectedProductQuantity *
          (cur.product?.price *
            ((100 - cur.product?.disCount.salePercent) / 100)),
      0
    );
  }, [productsInBasket]);
  return (
    <div className="lg:w-full min-h-screen flex justify-center">
      {qrcode && <Qr qrcode={qrcode} setQrcode={setQrcode} />}
      {productsInBasket.length ? (
        <div className="flex flex-col lg:w-full lg:flex lg:flex-row justify-center pt-16 lg:gap-16">
          <ProductSectionOfBasket
            productsInBasket={productsInBasket}
            setProductsInBasket={setProductsInBasket}
            token={token}
          />
          <PaymentSection total={total} token={token} setQrcode={setQrcode} />
        </div>
      ) : (
        <div className="flex flex-col mt-60 items-center">
          <p className="font-semibold text-2xl flex justify-center items-center">
            Your cart is empty
          </p>
          <a href="/order">
            <button className="rounded-lg bg-black text-white w-[300px] h-[40px]  mt-5">
              My orders
            </button>
          </a>
        </div>
      )}
    </div>
  );
};
export default Basket;
