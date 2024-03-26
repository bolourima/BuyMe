import { Router } from "express";
import { deleteProduct, getProducts } from "../controllers/productController";
export const productRouter = Router();
productRouter.route("/getProducts").get(getProducts);
productRouter.route("/deleteProduct/:id").delete(deleteProduct);
