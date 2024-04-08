"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productSchema = void 0;
const mongoose_1 = require("mongoose");
exports.productSchema = new mongoose_1.Schema({
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
    shopId: { type: mongoose_1.Schema.ObjectId, ref: "Admin", required: true },
});
const Product = (0, mongoose_1.model)("Product", exports.productSchema);
exports.default = Product;
