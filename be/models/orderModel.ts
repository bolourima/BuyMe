import { Schema, model } from "mongoose";
import { productSchema } from "./productModel";
export const SelectedProductSchema = new Schema({
  product: productSchema,
  selectedProductQuantity: Number,
});
const OrderSchema = new Schema({
  products: [{ product: productSchema, selectedProductQuantity: Number }],
  orderNumber: Number,
  user: { type: Schema.ObjectId, ref: "User", required: true },
  total: Number,
  createdAt: Date,
  updatedAt: Date,
  invoiceId: String,
  paymentStatus: { type: String, enum: ["PAID", "UNPAID"] },
  deliveryStatus: {
    type: String,
    enum: ["PENDING", "SHIPPED", "DELIVERED", "CANCELED"],
  },
});
const Order = model("Order", OrderSchema);
export default Order;
