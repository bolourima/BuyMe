"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.ObjectId, ref: "User", required: true },
    addressName: {
        type: String,
        maxlength: 30,
        minlength: 2,
        required: [true, "Please enter your address name"],
    },
    city: {
        type: String,
        maxlength: 30,
        minlength: 3,
        required: [true, "Please enter your city"],
    },
    district: {
        type: String,
        maxlength: 30,
        minlength: 2,
        required: [true, "Please enter your District"],
    },
    khoroo: {
        type: String,
        maxlength: 30,
        minlength: 2,
        required: [true, "Please enter your Khoroo"],
    },
    building: {
        type: String,
        maxlength: 30,
        minlength: 3,
        required: [true, "Please enter your Building"],
    },
    deliveryNote: {
        type: String,
        maxlength: 30,
        minlength: 3,
    },
});
const Address = (0, mongoose_1.model)("Address", addressSchema);
exports.default = Address;
