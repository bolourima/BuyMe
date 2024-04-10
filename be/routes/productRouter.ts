import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getFilteredProducts,
  getProductDetail,
  getProducts,
  getProductsFromShop,
  getSelectedProductsInAdmin,
  uploadSingleImage,
} from "../controllers/productController";
import upload from "../middlewares/multer";
import { accessTokenAuth } from "../middlewares/accessTokenAuth";
import { searchProduct } from "../controllers/searchController";
export const productRouter = Router();
productRouter.route("/createProduct").post(accessTokenAuth, createProduct);
productRouter.route("/editProduct").put(accessTokenAuth, editProduct);
productRouter
  .route("/selectImage")
  .post(upload.single("img"), accessTokenAuth, uploadSingleImage);
productRouter.route("/getProducts").get(getProducts).post(searchProduct);
productRouter
  .route("/getProducts/:category/:subCategory")
  .get(getFilteredProducts)
  .post(searchProduct);
productRouter
  .route("/deleteProduct/:id")
  .delete(accessTokenAuth, deleteProduct);
productRouter.route("/productDetail/:id").get(getProductDetail);
productRouter
  .route("/getSelectedProducts")
  .get(accessTokenAuth, getSelectedProductsInAdmin);
productRouter.route("/shop/:id").get(getProductsFromShop);
