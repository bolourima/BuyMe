"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRouter = void 0;
const express_1 = require("express");
const orderController_1 = require("../controllers/orderController");
const accessTokenAuth_1 = require("../middlewares/accessTokenAuth");
exports.orderRouter = (0, express_1.Router)();
exports.orderRouter.route("/createOrder").post(accessTokenAuth_1.accessTokenAuth, orderController_1.createOrder);
