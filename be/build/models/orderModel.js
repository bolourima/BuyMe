"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    products: Array,
    orderNumber: Number,
    user: { type: mongoose_1.Schema.ObjectId, ref: "User", required: true },
    total: Number,
    createdAt: Date,
    updatedAt: Date,
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
