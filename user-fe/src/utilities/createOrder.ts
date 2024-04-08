import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { toastifyError, toastifySuccess } from "./toastify";
import { emptyBasket } from "@/helper/emptyBasket";
import { Dispatch, SetStateAction } from "react";
type Order = {
  product: ProductType;
  selectedProductQuantity: number;
};
const orderNumberGenerator = () => {
  return Math.floor(Math.random() * 900000) + 100000;
};
export const createOrder = async (
  products: ProductTypeWithQuantity[],
  token: string,
  total: number,
  setQrcode: React.Dispatch<React.SetStateAction<string>>,
  setProductsInBasket: Dispatch<SetStateAction<ProductTypeWithQuantity[]>>
) => {
  try {
    const selectedProductContainer: Order[] = [];
    for (let i = 0; i < products.length; i++) {
      selectedProductContainer.push({
        product: products[i].product,
        selectedProductQuantity: products[i].selectedProductQuantity,
      });
    }
    const tokenRes = await instance.post(
      "https://merchant.qpay.mn/v2/auth/token",
      null,
      {
        headers: { Authorization: `Basic UE9XRVJfRVhQTzpvOXc4V0xoWg==` },
      }
    );
    localStorage.setItem("paymentToken", tokenRes.data.access_token);
    const invoiceRes = await instance.post(
      "/createInvoice",
      {
        token: tokenRes.data.access_token,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.setItem("invoiceId", invoiceRes.data.invoice_id);
    setQrcode(invoiceRes.data.qPay_shortUrl);
    const res = await instance.post(
      "/createOrder",
      {
        products: selectedProductContainer,
        total: total,
        invoiceId: invoiceRes.data.invoice_id,
        orderNumber: orderNumberGenerator(),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    emptyBasket(setProductsInBasket);
    return toastifySuccess("Order created");
  } catch (error) {
    toastifyError("Failed to order");
  }
};
