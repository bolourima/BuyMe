"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const orderModel_1 = require("./orderModel");
const basketSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.ObjectId, ref: "User", required: true },
    products: [orderModel_1.SelectedProductSchema],
});
const Basket = (0, mongoose_1.model)("Basket", basketSchema);
exports.default = Basket;
