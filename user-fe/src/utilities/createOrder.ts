import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { toastifyError, toastifySuccess } from "./toastify";
import { emptyBasket } from "@/helper/emptyBasket";
import { Dispatch, SetStateAction } from "react";
import { InvoiceType } from "@/types/invoiceType";
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
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceType>>,
  setProductsInBasket: Dispatch<SetStateAction<ProductTypeWithQuantity[]>>,
  addressId: string
) => {
  try {
    const selectedProductContainer: Order[] = [];
    for (let i = 0; i < products.length; i++) {
      selectedProductContainer.push({
        product: products[i].product,
        selectedProductQuantity: products[i].selectedProductQuantity,
      });
    }
    const res = await instance.post(
      "/createOrder",
      {
        products: selectedProductContainer,
        total: total,
        invoiceId: "",
        orderNumber: orderNumberGenerator(),
        addressId: addressId,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    emptyBasket(setProductsInBasket);
    toastifySuccess("Order created");
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
        amount: total,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.setItem("invoiceId", invoiceRes.data.invoice_id);
    setInvoice(invoiceRes.data);
    await instance.put(
      `/changeOrderInvoice/${res.data.id}`,
      {
        invoiceId: invoiceRes.data.invoice_id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    toastifyError("Failed to order");
    console.error("error: ", error);
  }
};
