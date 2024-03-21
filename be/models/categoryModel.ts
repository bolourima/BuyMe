import { Schema, model } from "mongoose";

const categorySchema = new Schema({
  name: String,
});

const Category = model("Category", categorySchema);
export default Category;
