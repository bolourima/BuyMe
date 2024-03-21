"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: String,
    description: String,
    price: Number,
    productCode: Number,
    quantity: Number,
    tag: String,
    disCount: Object,
    categoryId: { type: mongoose_1.Schema.ObjectId, ref: "Category", required: true },
    subCategoryName: String,
    brandName: String,
    images: [String],
    createdAt: String,
    updatedAt: String,
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
