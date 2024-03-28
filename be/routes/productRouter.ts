import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getProducts,
  uploadSingleImage,
} from "../controllers/productController";
import upload from "../middlewares/multer";
export const productRouter = Router();
productRouter.route("/createProduct").post(createProduct);
productRouter.route("/editProduct").put(editProduct);
productRouter
  .route("/selectImage")
  .post(upload.single("img"), uploadSingleImage);
productRouter.route("/getProducts").get(getProducts);
productRouter.route("/deleteProduct/:id").delete(deleteProduct);
