import { instance } from "@/instance";
import { ProductType } from "@/types/productType";
import { ProductTypeWithQuantity } from "@/types/productWithQuantityType";
import { headers } from "next/headers";
type Order = {
  product: ProductType;
  selectedProductQuantity: number;
};

export const createOrder = async (
  products: ProductTypeWithQuantity[],
  token: string,
  total: number
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
    const invoiceRes = await instance.post(
      "https://merchant.qpay.mn/v2/invoice",
      {
        invoice_code: "POWER_EXPO_INVOICE",
        sender_invoice_no: "1234567",
        invoice_receiver_code: "terminal",
        invoice_description: "test",
        amount: 10,
        callback_url: "http://localhost:3000",
      },
      {
        headers: {
          Authorization: `Bearer ${paymentRes.data.access_token}`,
        },
      }
    );
    console.log("invoiceRes", invoiceRes);
    // const res = await instance.post(
    //   "/createOrder",
    //   { products: selectedProductContainer, total: total },
    //   { headers: { Authorization: `Bearer ${token}` } }
    // );
    // if (res.status == 201) return alert("Created");
    // if (res.status == 403) return alert("User invalid");
    // if (res.status == 400) return alert("Failed to create order");
  } catch (error) {
    console.error("error in creating order", error);
  }
};
