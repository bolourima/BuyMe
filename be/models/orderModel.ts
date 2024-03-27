import { Schema, model } from "mongoose";
const SelectedProductSchema = new Schema({
  product: { type: Schema.ObjectId, ref: "Product", required: true },
  selectedProductQuantity: Number,
});
const OrderSchema = new Schema({
  products: [SelectedProductSchema],
  orderNumber: Number,
  user: { type: Schema.ObjectId, ref: "User", required: true },
  total: Number,
  createdAt: Date,
  updatedAt: Date,
});
const Order = model("Order", OrderSchema);
export default Order;
