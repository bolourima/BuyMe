import { instance } from "@/instance";

export const getPaymentTokenRes = async () => {
  try {
    const res = await instance.post(
      "https://merchant.qpay.mn/v2/auth/token",
      null,
      {
        headers: { Authorization: `Basic UE9XRVJfRVhQTzpvOXc4V0xoWg==` },
      }
    );
    return res;
  } catch (error) {
    console.error("error in get payment token");
  }
};
