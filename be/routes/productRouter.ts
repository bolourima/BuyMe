import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getFilteredProducts,
  getProductDetail,
  getProducts,
  getSelectedProductsInAdmin,
  uploadSingleImage,
} from "../controllers/productController";
import upload from "../middlewares/multer";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";
export const productRouter = Router();
productRouter.route("/createProduct").post(accessTokenAuth, createProduct);
productRouter.route("/editProduct").put(accessTokenAuth, editProduct);
productRouter
  .route("/selectImage")
  .post(upload.single("img"), accessTokenAuth, uploadSingleImage);
productRouter.route("/getProducts").get(getProducts)
productRouter.route("/getProducts/:category").get(getFilteredProducts);
productRouter
  .route("/deleteProduct/:id")
  .delete(accessTokenAuth, deleteProduct);
productRouter.route("/getProducts/:id").post(getProductDetail);
productRouter
  .route("/getSelectedProducts")
  .get(accessTokenAuth, getSelectedProductsInAdmin);
