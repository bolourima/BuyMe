import { Router } from "express";
import {
  createOrder,
  getOrdersInAdmin,
  getSelectedOrders,
} from "../controllers/orderController";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";

export const orderRouter = Router();
orderRouter.route("/createOrder").post(accessTokenAuth, createOrder);
orderRouter.route("/getOrdersInAdmin").get(accessTokenAuth, getOrdersInAdmin);
orderRouter.route("/getOrders").get(accessTokenAuth, getSelectedOrders);
