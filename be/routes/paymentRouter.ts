import { Router } from "express";
import { checkPayment, createInvoice } from "../controllers/paymentController";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";

export const paymentRouter = Router();
paymentRouter.route("/createInvoice").post(accessTokenAuth, createInvoice);
paymentRouter.route("/checkPayment").post(checkPayment);
