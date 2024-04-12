"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectToDB_1 = require("./connectToDB");
const categoryRouter_1 = require("./routes/categoryRouter");
const productRouter_1 = require("./routes/productRouter");
const subCategoryRouter_1 = require("./routes/subCategoryRouter");
const cors_1 = __importDefault(require("cors"));
const userRouter_1 = require("./routes/userRouter");
const signInRouter_1 = require("./routes/signInRouter");
const signUpRouter_1 = require("./routes/signUpRouter");
const orderRouter_1 = require("./routes/orderRouter");
const basketRouter_1 = require("./routes/basketRouter");
const adminRouter_1 = require("./routes/adminRouter");
const addressRouter_1 = require("./routes/addressRouter");
const paymentRouter_1 = require("./routes/paymentRouter");
const favoritesRouter_1 = require("./routes/favoritesRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: "*",
}));
app.use(categoryRouter_1.categoryRouter);
app.use(productRouter_1.productRouter);
app.use(subCategoryRouter_1.subCategoryRouter);
app.use(userRouter_1.userRouter);
app.use(signInRouter_1.signInRouter);
app.use(signUpRouter_1.signUpRouter);
app.use(orderRouter_1.orderRouter);
app.use(basketRouter_1.basketRouter);
app.use(adminRouter_1.adminRouter);
app.use(addressRouter_1.addressRouter);
app.use(paymentRouter_1.paymentRouter);
app.use(favoritesRouter_1.favoritesRouter);
(0, connectToDB_1.connectToDB)();
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
