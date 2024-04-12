"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
const multer_1 = __importDefault(require("../middlewares/multer"));
const accessTokenAuth_1 = require("../middlewares/accessTokenAuth");
const searchController_1 = require("../controllers/searchController");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.route("/createProduct").post(accessTokenAuth_1.accessTokenAuth, productController_1.createProduct);
exports.productRouter.route("/editProduct").put(accessTokenAuth_1.accessTokenAuth, productController_1.editProduct);
exports.productRouter
    .route("/selectImage")
    .post(multer_1.default.single("img"), accessTokenAuth_1.accessTokenAuth, productController_1.uploadSingleImage);
exports.productRouter.route("/getAllProducts/:page").get(productController_1.getAllProducts);
exports.productRouter.route("/getProducts").post(searchController_1.searchProduct);
exports.productRouter.route("/getQuantityOfProducts").get(productController_1.getQuantityOfProducts);
exports.productRouter
    .route("/getProducts/:category/:subCategory")
    .get(productController_1.getFilteredProducts)
    .post(searchController_1.filterSubCategory);
exports.productRouter
    .route("/deleteProduct/:id")
    .delete(accessTokenAuth_1.accessTokenAuth, productController_1.deleteProduct);
exports.productRouter.route("/productDetail/:id").get(productController_1.getProductDetail);
exports.productRouter
    .route("/getSelectedProducts")
    .get(accessTokenAuth_1.accessTokenAuth, productController_1.getSelectedProductsInAdmin);
exports.productRouter.route("/shop/:id").get(productController_1.getProductsFromShop);
