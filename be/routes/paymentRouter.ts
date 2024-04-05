import { Router } from "express";
import { checkPayment, createInvoice } from "../controllers/paymentController";

export const paymentRouter = Router();
paymentRouter.route("/createInvoice").post(createInvoice);
paymentRouter.route("/checkPayment").post(checkPayment);
