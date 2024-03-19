"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRouter = void 0;
const express_1 = require("express");
const productController_1 = require("../controllers/productController");
exports.productRouter = (0, express_1.Router)();
exports.productRouter.route("/createProduct").post(productController_1.createProduct);
