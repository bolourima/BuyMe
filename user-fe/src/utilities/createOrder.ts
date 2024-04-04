import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { headers } from "next/headers";
import { toastifyError, toastifySuccess } from "./toastify";
type Order = {
  product: ProductType;
  selectedProductQuantity: number;
};

export const createOrder = async (
  products: ProductTypeWithQuantity[],
  token: string,
  total: number,
  setQrcode: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const selectedProductContainer: Order[] = [];
    for (let i = 0; i < products.length; i++) {
      selectedProductContainer.push({
        product: products[i].product,
        selectedProductQuantity: products[i].selectedProductQuantity,
      });
    }
    const paymentRes = await instance.post(
      "https://merchant.qpay.mn/v2/auth/token",
      null,
      {
        headers: { Authorization: `Basic UE9XRVJfRVhQTzpvOXc4V0xoWg==` },
      }
    );
    const invoiceRes = await instance.post("/createInvoice", {
      token: paymentRes.data.access_token,
    });
    setQrcode(invoiceRes.data.qPay_shortUrl);
    localStorage.setItem("paymentToken", paymentRes.data.access_token);
    const res = await instance.post(
      "/createOrder",
      {
        products: selectedProductContainer,
        total: total,
        invoiceId: invoiceRes.data.invoice_id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    toastifySuccess("Order created");
    return localStorage.setItem("invoiceId", res.data.invoiceId);
  } catch (error) {
    toastifyError("Failed to order");
  }
};
