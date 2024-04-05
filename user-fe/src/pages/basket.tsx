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
    <div className=" flex flex-col  lg:w-full lg:flex lg:flex-row justify-center pt-16 min-h-screen">
      {qrcode && <Qr qrcode={qrcode} />}
      <ProductSectionOfBasket
        productsInBasket={productsInBasket}
        setProductsInBasket={setProductsInBasket}
        token={token}
      />
      {productsInBasket.length && (
        <PaymentSection total={total} token={token} setQrcode={setQrcode} />
      )}
    </div>
  );
};
export default Basket;
