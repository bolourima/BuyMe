import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getFilteredProducts,
  getProductDetail,
  getProducts,
  getProductsFromShop,
  getQuantityOfProducts,
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
productRouter.route("/getAllProducts/:page").get(getAllProducts);
productRouter.route("/getProducts").post(searchProduct);
productRouter.route("/getQuantityOfProducts").get(getQuantityOfProducts);
productRouter
  .route("/getProducts/:category")
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
