import { Router } from "express";
import { createOrder, getOrdersInAdmin } from "../controllers/orderController";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";

export const orderRouter = Router();
orderRouter.route("/createOrder").post(accessTokenAuth, createOrder);
orderRouter.route("/getOrdersInAdmin").get(getOrdersInAdmin);
