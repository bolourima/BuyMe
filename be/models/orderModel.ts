import { Schema, model } from "mongoose";
import { productSchema } from "./productModel";
export const SelectedProductSchema = new Schema({
  product: productSchema,
  selectedProductQuantity: Number,
});
const OrderSchema = new Schema({
  products: [
    {
      product: {
        name: String,
        description: String,
        price: Number,
        productCode: Number,
        quantity: Number,
        tag: String,
        disCount: Object,
        categoryId: { type: Schema.ObjectId, ref: "Category", required: true },
        subCategoryName: String,
        brandName: String,
        images: [String],
        createdAt: String,
        updatedAt: String,
        shopId: { type: Schema.ObjectId, ref: "Admin", required: true },
      },
      selectedProductQuantity: Number,
    },
  ],
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
