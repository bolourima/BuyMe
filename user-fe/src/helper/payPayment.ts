import { instance } from "@/instance";
import { toastifyError } from "@/utilities/toastify";
import { Dispatch, SetStateAction } from "react";
export const payPayment = async (
  setQrcode: Dispatch<SetStateAction<string>>,
  orderId: string,
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
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    await instance.put(
      `/changeOrderInvoice/${orderId}`,
      {
        invoiceId: invoiceRes.data.invoice_id,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    localStorage.setItem("invoiceId", invoiceRes.data.invoice_id);
    setQrcode(invoiceRes.data.qPay_shortUrl);
  } catch (error) {
    toastifyError("Failed to pay");
  }
};
