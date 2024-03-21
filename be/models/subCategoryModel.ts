import { Schema, model } from "mongoose";

const subCategorySchema = new Schema({
  name: String,
  category: { type: Schema.ObjectId, ref: "Category", require: true },
  brands: [],
});
const SubCategory = model("SubCategory", subCategorySchema);
export default SubCategory;
