"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favoritesSchema = new mongoose_1.Schema({
    products: [{ type: mongoose_1.Schema.ObjectId, ref: "Product", required: true }],
    user: { type: mongoose_1.Schema.ObjectId, ref: "User", required: true },
    addedAt: { type: Date, required: true },
});
const Favorites = (0, mongoose_1.model)("Favorite", favoritesSchema);
exports.default = Favorites;
