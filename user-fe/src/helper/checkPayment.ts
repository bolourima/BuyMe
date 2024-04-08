import { instance } from "@/instance";
import {
  toastifyError,
  toastifySuccess,
  toastifyWarning,
} from "@/utilities/toastify";
import { Dispatch, SetStateAction } from "react";
export const checkPayment = async (
  setIsPaid: Dispatch<SetStateAction<boolean>>
) => {
  try {
    const paymentCheckRes = await instance.post("/checkPayment", {
      invoiceId: localStorage.getItem("invoiceId"),
      token: localStorage.getItem("paymentToken"),
    });
    if (paymentCheckRes.data === "PAID") {
      localStorage.removeItem("invoiceId");
      localStorage.removeItem("paymentToken");
      setIsPaid(true);
      return toastifySuccess("Paid!");
    } else return toastifyWarning("Not paid");
  } catch (error) {
    toastifyError("Payment time is expired");
  }
};
