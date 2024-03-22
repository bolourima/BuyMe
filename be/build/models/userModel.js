"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        maxlength: 30,
        minlength: 2,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your Email"],
    },
    phoneNumber: {
        type: Number,
        minlength: 8,
        maxlength: 8,
    },
    password: {
        type: String,
        minlength: 4,
        required: [true, "Please enter your passport"],
    },
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
