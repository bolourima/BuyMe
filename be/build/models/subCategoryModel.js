"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subCategorySchema = new mongoose_1.Schema({
    name: String,
    category: { type: mongoose_1.Schema.ObjectId, ref: "Category", require: true },
    brands: [],
});
const SubCategory = (0, mongoose_1.model)("SubCategory", subCategorySchema);
exports.default = SubCategory;
