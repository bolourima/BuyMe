import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  products: [{ type: Schema.ObjectId, ref: "Product", required: true }],
  orderNumber: Number,
  user: { type: Schema.ObjectId, ref: "User", required: true },
  createdAt: Date,
  updatedAt: Date,
});
const Order = model("Order", OrderSchema);
export default Order;
