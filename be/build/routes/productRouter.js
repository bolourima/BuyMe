"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.route("/getProducts").get(productController_1.getProducts);
exports.productRouter.route("/deleteProduct/:id").delete(productController_1.deleteProduct);
