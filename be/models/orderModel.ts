import { Schema, model } from "mongoose";
const OrderSchema = new Schema({
  products: Array,
  orderNumber: Number,
  user: { type: Schema.ObjectId, ref: "User", required: true },
  total: Number,
  createdAt: Date,
  updatedAt: Date,
});
const Order = model("Order", OrderSchema);
export default Order;
