"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectedProductSchema = void 0;
const mongoose_1 = require("mongoose");
const productModel_1 = require("./productModel");
exports.SelectedProductSchema = new mongoose_1.Schema({
    product: productModel_1.productSchema,
    selectedProductQuantity: Number,
});
const OrderSchema = new mongoose_1.Schema({
    products: [{ product: productModel_1.productSchema, selectedProductQuantity: Number }],
    orderNumber: Number,
    user: { type: mongoose_1.Schema.ObjectId, ref: "User", required: true },
    total: Number,
    createdAt: Date,
    updatedAt: Date,
    invoiceId: String,
    paymentStatus: { type: String, enum: ["PAID", "UNPAID"] },
    deliveryStatus: {
        type: String,
        enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELED"],
    },
});
const Order = (0, mongoose_1.model)("Order", OrderSchema);
exports.default = Order;
