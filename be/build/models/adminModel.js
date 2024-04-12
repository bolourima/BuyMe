"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    shopName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    bankAccount: { type: Number, required: true },
    subAdmin: { type: Boolean, required: true },
    categories: [{ type: mongoose_1.Schema.ObjectId, ref: "Category" }],
    description: { type: String, required: true },
});
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
