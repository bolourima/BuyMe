import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: String,
  subCategories: Array,
});
const Category = model("Category", categorySchema);
export default Category;
