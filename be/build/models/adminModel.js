"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    shopName: String,
    email: String,
    password: String,
    bankAccount: Number,
    subAdmin: Boolean,
    categories: [{ type: mongoose_1.Schema.ObjectId, ref: "Category" }],
});
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
