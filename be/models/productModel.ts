import { Schema, model } from "mongoose";

const productSchema = new Schema({
  productName: String,
  description: String,
  categoryId: { type: Schema.ObjectId, ref: "Category", required: true },
  price: Number,
  qty: Number,
  thumbnails: String,
  images: [String],
  coupon: String,
  salePercent: Number,
  viewsCount: Number,
  createdAt: Date,
  updatedAt: Date,
});
const Product = model("Product", productSchema);
export default Product;
