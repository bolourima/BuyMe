import { instance } from "@/instance";
import { InvoiceType } from "@/types/invoiceType";
import { OrderType } from "@/types/orderType";
import { toastifyError } from "@/utilities/toastify";
import { Dispatch, SetStateAction } from "react";
export const payPayment = async (
  setInvoice: Dispatch<SetStateAction<InvoiceType>>,
  order: OrderType,
  token: string
) => {
  try {
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
        amount: order.total,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await instance.put(
      `/changeOrderInvoice/${order._id}`,
      {
        invoiceId: invoiceRes.data.invoice_id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.setItem("invoiceId", invoiceRes.data.invoice_id);
    setInvoice(invoiceRes.data);
  } catch (error) {
    toastifyError("Failed to pay");
    console.error("error in pay payment", error);
  }
};
