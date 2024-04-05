"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.basketRouter = void 0;
const express_1 = require("express");
const basketController_1 = require("../controllers/basketController");
const accessTokenAuth_1 = require("../middlewares/accessTokenAuth");
exports.basketRouter = (0, express_1.Router)();
exports.basketRouter.route("/basket/:id").put(accessTokenAuth_1.accessTokenAuth, basketController_1.editBasket);
exports.basketRouter.route("/getBasketById").get(accessTokenAuth_1.accessTokenAuth, basketController_1.getBasketById);
exports.basketRouter
    .route("/deleteProductFromBasket/:id")
    .delete(accessTokenAuth_1.accessTokenAuth, basketController_1.deleteProductFromBasket);
