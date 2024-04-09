import { Router } from "express";
import {
  changeOrderInvoice,
  createOrder,
  getOrdersInAdmin,
  getOrdersOfUser,
} from "../controllers/orderController";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";

export const orderRouter = Router();
orderRouter.route("/createOrder").post(accessTokenAuth, createOrder);
orderRouter.route("/getOrdersInAdmin").get(accessTokenAuth, getOrdersInAdmin);
orderRouter.route("/getOrdersOfUser").get(accessTokenAuth, getOrdersOfUser);
orderRouter
  .route("/changeOrderInvoice/:id")
  .put(accessTokenAuth, changeOrderInvoice);
