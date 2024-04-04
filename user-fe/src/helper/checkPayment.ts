import { instance } from "@/instance";
import {
  toastifyError,
  toastifySuccess,
  toastifyWarning,
} from "@/utilities/toastify";
import axios from "axios";

export const checkPayment = async () => {
  try {
    const paymentCheckRes = await instance.post("/checkPayment", {
      invoiceId: localStorage.getItem("invoiceId"),
      token: localStorage.getItem("paymentToken"),
    });
    if (paymentCheckRes.data === "PAID") {
      localStorage.removeItem("invoiceId");
      localStorage.removeItem("paymentToken");
      return toastifySuccess("Paid!");
    } else return toastifyWarning("Not paid");
  } catch (error) {
    toastifyError("Failed to checkpayment");
  }
};
