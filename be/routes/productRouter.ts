import { Router } from "express";
import { getProducts } from "../controllers/productController";
export const productRouter = Router();
productRouter.route("/getProducts").get(getProducts);
