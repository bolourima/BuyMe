"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRouter = void 0;
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
exports.paymentRouter = (0, express_1.Router)();
exports.paymentRouter.route("/createInvoice").post(paymentController_1.createInvoice);
exports.paymentRouter.route("/checkPayment").post(paymentController_1.checkPayment);
