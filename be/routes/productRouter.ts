import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
} from "../controllers/productController";
import upload from "../middlewares/multer";
export const productRouter = Router();
productRouter
  .route("/createProduct")
  .post(upload.array("images"), createProduct);
productRouter.route("/editProduct").put(upload.array("images"), editProduct);
productRouter.route("/getProducts").get(getProducts);
productRouter.route("/deleteProduct/:id").delete(deleteProduct);
