import { Router } from "express";
import {
  deleteProductFromBasket,
  editBasket,
  getBasketById,
} from "../controllers/basketController";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";

export const basketRouter = Router();
basketRouter.route("/basket/:id").put(accessTokenAuth, editBasket);
basketRouter.route("/getBasketById").get(accessTokenAuth, getBasketById);
basketRouter
  .route("/deleteProductFromBasket/:id")
  .delete(accessTokenAuth, deleteProductFromBasket);
