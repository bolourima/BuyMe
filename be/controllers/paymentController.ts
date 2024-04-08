import { Request, Response } from "express";
import axios from "axios";
import Order from "../models/orderModel";
import Invoice from "../models/invoiceModel";
interface AuthenticatedRequest extends Request {
  user?: any;
}
export const createInvoice = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const response = await axios.post(
      "https://merchant.qpay.mn/v2/invoice",
      {
        invoice_code: "POWER_EXPO_INVOICE",
        sender_invoice_no: "1234567",
        invoice_receiver_code: "terminal",
        invoice_description: "test",
        amount: 10,
        callback_url:
          "https://buymeuserfe-ofjixqgcj-bolormaas-projects.vercel.app",
      },
      {
        headers: {
          Authorization: `Bearer ${req.body.token}`,
        },
      }
    );
    const invoice = await Invoice.create({
      id: response.data.invoice_id,
      user: req.user.id,
      isPaid: false,
      createdAt: new Date(),
    });
    return res.status(201).send(response.data);
  } catch (error) {
    console.error("error in create invoice", error);
    return res.status(400).json({ msg: error });
  }
};
export const checkPayment = async (req: Request, res: Response) => {
  try {
    const response = await axios.post(
      "https://merchant.qpay.mn/v2/payment/check",
      {
        object_type: "INVOICE",
        object_id: req.body.invoiceId,
        offset: {
          page_number: 1,
          page_limit: 100,
        },
      },
      { headers: { Authorization: `Bearer ${req.body.token}` } }
    );
    if (response.data.rows[0]?.payment_status === "PAID") {
      await Order.findOneAndUpdate(
        { invoiceId: req.body.invoiceId },
        { paymentStatus: "PAID" }
      );
    }
    return res.status(200).send(response.data.rows[0]?.payment_status);
  } catch (error) {
    console.error("error in checkpayment", error);
    return res.status(400).send("Failed");
  }
};
