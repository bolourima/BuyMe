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
import { InvoiceType } from "@/types/invoiceType";
import { invoiceInitial } from "@/types/invoiceInitial";
import { LoadingIcon } from "@/icon/LoadingIcon";
const Basket = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { productsInBasket, setProductsInBasket } = useContext(
    ProductsInBasketContext
  );
  const [invoice, setInvoice] = useState<InvoiceType>(invoiceInitial);
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
      {loading && (
        <div className="w-full flex full justify-center items-center absolute z-50">
          <button className="w-12 h-12">
            <LoadingIcon />
          </button>
        </div>
      )}
      {invoice.invoice_id && <Qr invoice={invoice} setInvoice={setInvoice} />}
      {productsInBasket.length ? (
        <div className="flex flex-col lg:w-full lg:flex lg:flex-row lg:justify-center lg:pt-16 lg:gap-16 place-con">
          <ProductSectionOfBasket
            productsInBasket={productsInBasket}
            setProductsInBasket={setProductsInBasket}
            token={token}
          />
          <PaymentSection
            total={total}
            token={token}
            setInvoice={setInvoice}
            setLoading={setLoading}
          />
        </div>
      ) : (
        <div className="flex flex-col mt-32 items-center">
          <p className="font-semibold text-2xl flex justify-center items-center">
            Your cart is empty
          </p>
          <a href="/orders/list">
            <button className="rounded-lg bg-black text-white w-[300px] h-[40px] mt-5 ">
              My orders
            </button>
          </a>
        </div>
      )}
    </div>
  );
};
export default Basket;
