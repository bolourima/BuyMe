"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    productName: String,
    categoryId: { type: mongoose_1.Schema.ObjectId, ref: "Category", required: true },
    price: Number,
    qty: Number,
    thumbnails: String,
    images: [String],
    coupon: String,
    salePercent: Number,
    description: String,
    viewsCount: Number,
    createdAt: Date,
    updatedAt: Date,
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
