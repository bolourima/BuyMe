import { Schema, model } from "mongoose";

const productSchema = new Schema({
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
});
const Product = model("Product", productSchema);
export default Product;
