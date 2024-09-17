"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const invoiceSchema = new mongoose_1.Schema({
    id: String,
    user: { type: String, ref: "User", required: true },
    idPaid: Boolean,
    createdAt: Date,
});
const Invoice = (0, mongoose_1.model)("Invoice", invoiceSchema);
exports.default = Invoice;
