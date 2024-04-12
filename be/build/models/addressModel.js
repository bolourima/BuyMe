"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.ObjectId, ref: "User" },
    district: {
        type: String,
        maxlength: 30,
        required: [true, "Please enter your District"],
    },
    building: {
        type: String,
        maxlength: 30,
        required: [true, "Please enter your Building"],
    },
    deliveryNote: {
        type: String,
        maxlength: 30,
    },
});
const Address = mongoose_1.models.Address || (0, mongoose_1.model)("Address", addressSchema);
exports.default = Address;
