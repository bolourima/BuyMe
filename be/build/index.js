"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectToDB_1 = require("./connectToDB");
const categoryRouter_1 = require("./routes/categoryRouter");
const productRouter_1 = require("./routes/productRouter");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("", categoryRouter_1.categoryRouter);
app.use("", productRouter_1.productRouter);
(0, connectToDB_1.connectToDB)();
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
